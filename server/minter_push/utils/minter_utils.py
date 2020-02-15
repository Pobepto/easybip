import requests
from mintersdk.sdk.wallet import MinterWallet
from mintersdk.minterapi import MinterAPI
from mintersdk.sdk.transactions import MinterSendCoinTx


class MinterApiUtils:
    minter_api = MinterAPI('https://api.minter.one/')

    def create_address(self):
        wallet = MinterWallet.create()
        print(self.get_balance(wallet["address"]))
        return wallet["address"], wallet["private_key"]

    def get_balance(self, address):
        balance = self.minter_api.get_balance(address=address)
        return balance

    def send_transaction(self, coin, to, value, private_key, from_address):
        nonce = self.minter_api.get_nonce(from_address)
        tx = MinterSendCoinTx(coin, to, value, nonce=nonce, gas_coin='BIP', gas=1)
        tx.sign(private_key)
        req = requests.post(url="https://gate-api.minter.network/api/v1/transaction/push",
                            json={
                                "transaction": tx.signed_tx
                            })
        return req
