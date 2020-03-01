import json
import logging
import os
import requests
from fastapi import FastAPI, Form
from starlette.responses import JSONResponse

from minter_push.utils.minter_utils import MinterApiUtils
from minter_push.utils.utils import create_short_link, encrypt_private_key, get_password_hash, decrypt_private_key, \
    compare_hash, send_email
from minter_push.db.postgresql import PostgreSQL
from minter_push.api.minter_models import SendToSingleUser, SendToSeveralUsers, SendBIPTransaction, CheckPassword, Gift

logger = logging.getLogger(__file__)
logger.setLevel(logging.DEBUG)
logger.addHandler(logging.FileHandler("api.log"))

app = FastAPI()
minter_api_utils = MinterApiUtils()
postgres = PostgreSQL()


@app.post("/api/v1/wallet/send")
async def send_to_single_user(request: SendToSingleUser):
    """
    Create wallet for single user
    :return: {"link": str}
    """
    try:
        rec_count = postgres.count_of_records()

        link = create_short_link(rec_count)
        address, private_key = minter_api_utils.create_address()
        encrypted_private_key = encrypt_private_key(private_key=private_key, password=request.password)
        password_hash = get_password_hash(request.password)
        postgres.create_record(address=address, private_key=encrypted_private_key, link=link,
                               password=password_hash, from_=request.from_, to=request.to,
                               amount="")
        return JSONResponse(
            {"link": link},
            status_code=200
        )
    except Exception as exc:
        logger.error(exc)
        return JSONResponse(
            status_code=500,
            content="Something goes wrong."
        )


@app.post("/api/v1/wallets/send")
async def send_to_several_users(request: SendToSeveralUsers):
    """
    Create wallets for several users
    :return: {"link": str}
    """
    try:
        users = request.users

        password_hash = get_password_hash(request.password)

        # Create wallet for mailing
        rec_count = postgres.count_of_records()
        source_link: str = create_short_link(rec_count)
        address, private_key = minter_api_utils.create_address()
        encrypted_private_key = encrypt_private_key(private_key=private_key,
                                                    password=os.environ.get("WALLET_PASSWORD", ""))
        postgres.create_record(address=address, private_key=encrypted_private_key, link=source_link,
                               password=password_hash, source_link=source_link)

        # Create wallet for every user
        for i, user in enumerate(users):
            rec_count = postgres.count_of_records()
            link = create_short_link(rec_count)
            address, private_key = minter_api_utils.create_address()
            encrypted_private_key = encrypt_private_key(private_key=private_key, password=request.password)
            postgres.create_record(address=address, private_key=encrypted_private_key, link=link,
                                   password=password_hash, from_=request.from_,
                                   to=user.fullname, amount=user.amount, email=user.email,
                                   source_link=source_link)

        return JSONResponse(
            {"link": source_link},
            status_code=200
        )
    except Exception as exc:
        logger.error(exc)
        return JSONResponse(
            status_code=500,
            content="Something goes wrong."
        )


@app.get("/api/v1/wallet/{link}")
async def get_address_by_link(link: str):
    """
    Return address of wallet by wallet link
    :return: {"address": str}
    """
    try:
        record = postgres.get_record_by_link(link)
        if record is None:
            return JSONResponse(
                content=f"The link {link} is not represented in the database",
                status_code=404
            )
        return JSONResponse(
            {"address": record["address"]},
            status_code=200
        )
    except Exception as exc:
        logger.error(exc)
        return JSONResponse(
            status_code=500,
            content="Something goes wrong."
        )


@app.get("/api/v1/wallet/activate/{address}")
async def activate_wallet(address: str):
    """
    Activate wallet after wallet replenishment
    :return: {"link": str} - for single user
             {"link": [str]} - for several users
    """
    try:
        address_record = postgres.get_record_by_address(address)

        if address_record is None:
            return JSONResponse(
                content=f"The address {address} is not represented in the database",
                status_code=404
            )

        if address_record["source_link"] == "":
            postgres.activate_wallet(address)
            return JSONResponse(
                {"link": address_record["link"]},
                status_code=200
            )

        records = postgres.get_record_by_source_link(address_record["source_link"])
        if records is None:
            return JSONResponse(
                status_code=500,
                content="Something goes wrong"
            )

        if len(records) == 1:
            postgres.activate_wallet(address)
            return JSONResponse(
                {"link": records[0]["link"]},
                status_code=200
            )

        send_bip = {"link": address_record["source_link"], "password": os.environ.get("WALLET_PASSWORD", "")}
        links = []
        for record in records:
            if record["link"] == record["source_link"]:
                continue
            send_bip["amount"] = record["amount"]
            send_bip["to"] = record["address"]
            s_b_t = SendBIPTransaction(link=send_bip["link"], password=send_bip["password"], amount=send_bip["amount"],
                                       to=send_bip["to"])
            res = await send_bip_transaction(s_b_t)
            if res.status_code == 200:
                send_email(receiver=record["email"], link=record["link"], name=record["to"])
                postgres.activate_wallet(record["address"])
                links.append(record["link"])
            else:
                links.append("")
        if "" not in links:
            return JSONResponse(
                {"link": links},
                status_code=200
            )
        else:
            return JSONResponse(
                {"link": links},
                status_code=500,
            )
    except Exception as exc:
        logger.error(exc)
        return JSONResponse(
            status_code=500,
            content="Something goes wrong."
        )


@app.get("/api/v1/wallet/is_activated/{link}")
async def is_activated_wallet(link: str):
    """
    Check if wallet is activated
    :return: {"is_activated": bool}
    """
    try:
        record = postgres.get_record_by_link(link)
        if record is None:
            return JSONResponse(
                content=f"The link {link} is not represented in the database",
                status_code=404
            )
        if record["activated"] == "1":
            res = True
        else:
            res = False
        return JSONResponse(
            {"is_activated": res},
            status_code=200
        )
    except Exception as exc:
        logger.error(exc)
        return JSONResponse(
            status_code=500,
            content="Something goes wrong."
        )


@app.post("/api/v1/send/bip_wallet")
async def send_bip_transaction(request: SendBIPTransaction):
    """
    Send BIP to another BIP wallet
    :return: {}
    """
    try:
        record = postgres.get_record_by_link(request.link)
        if record is None:
            return JSONResponse(
                content=f"The link {request.link} is not represented in the database",
                status_code=404
            )
        address = record["address"]
        encrypted_private_key = record["private_key"]

        private_key = decrypt_private_key(encrypted_private_key, request.password)
        res = minter_api_utils.send_transaction(coin="BIP", to=request.to, value=request.amount, from_address=address,
                                                private_key=private_key, payload=request.payload)
        if res.status_code == 200:
            return JSONResponse(
                {},
                status_code=200
            )
        else:
            if json.loads(res.text)['error']['code'] == 107:
                return JSONResponse(
                    status_code=400,
                    content="Not enough money")
            else:
                logger.info(res.content)
                return JSONResponse(
                    status_code=500,
                    content=json.loads(res.text)['error']["log"])

    except Exception as exc:
        logger.error(exc)
        return JSONResponse(
            status_code=500,
            content="Something goes wrong."
        )


@app.post("/api/v1/password/check")
async def check_password(request: CheckPassword):
    """
    Check password of wallet
    :return: {"from_": str, "to": str, "amount": str, "email": str, "balance": dict}
    """
    try:
        record = postgres.get_record_by_link(request.link)
        if record is None:
            return JSONResponse(
                content=f"The link {request.link} is not represented in the database",
                status_code=404
            )
        correct_password = compare_hash(request.password, record["password"])

        if correct_password:
            balance = minter_api_utils.get_balance(record["address"])["result"]["balance"]
            return JSONResponse(
                {"from_": record["from_"], "to": record["to"], "amount": record["amount"], "email": record["email"],
                 "balance": balance},
                status_code=200
            )
        else:
            return JSONResponse(
                content="Incorrect password",
                status_code=401
            )
    except Exception as exc:
        logger.error(exc)
        return JSONResponse(
            status_code=500,
            content="Something goes wrong."
        )


@app.get("/api/v1/wallet/balance/{address}")
async def check_password(address: str):
    """
    Check password of wallet
    :return: {"balance": dict}
    """
    try:
        balance = minter_api_utils.get_balance(address)["result"]["balance"]
        return JSONResponse(
            {"balance": balance},
            status_code=200
        )
    except Exception as exc:
        logger.error(exc)
        return JSONResponse(
            status_code=500,
            content="Something goes wrong."
        )


@app.post("/api/v1/gift/order/{link}/{gift_name}")
async def gift_webhook(link: str, gift_name: str, code: str = Form(...)):
    """
    Webhook for gifts
    """
    try:
        logger.info(f"GIFT INFO. Link: {link}. Gift: {gift_name}. Code: {code}")
        postgres.create_gift_record(link, code, gift_name)
    except Exception as exc:
        logger.error(exc)


@app.get("/api/v1/gift/{link}")
async def get_gift(link: str):
    """
    Return list of user gifts
    :return: {"gifts": [{"gift_name":"gift_name", "code":"code"}}]}
    """
    try:
        gifts = postgres.get_gift_record_by_link(link=link)
        gifts_req = [{"gift_name": gift["gift_name"], "code": gift["code"]} for gift in gifts]
        return JSONResponse(
            {"gifts": gifts_req},
            status_code=200
        )
    except Exception as exc:
        logger.error(exc)
        return JSONResponse(
            status_code=500,
            content="Something goes wrong."
        )


@app.post("/api/v1/gift")
async def get_gift_wallet(request: Gift):
    """
    Return sum and address from gift api
    :return: {"summ":"summ", "address":"address"}
    """
    try:
        url = "http://minterfood.ru/miniapi/create_pay.php"
        payload = {"webhook": f'https://easybip.ru/api/v1/gift/order/{request.link}/{request.gift_name}',
                   "product": request.gift_name}
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        response = requests.post(url, headers=headers, data=payload)
        return JSONResponse(
            {"summ": json.loads(response.content)["summ"], "address": json.loads(response.content)["address"]},
            status_code=200
        )
    except Exception as exc:
        logger.error(exc)
        return JSONResponse(
            status_code=500,
            content="Something goes wrong."
        )
