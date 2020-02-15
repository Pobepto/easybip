import hashlib
import logging
import os
import short_url
from Cryptodome.Cipher import AES
import binascii
import smtplib
from socket import gaierror

logger = logging.getLogger(__file__)
logger.setLevel(logging.DEBUG)
logger.addHandler(logging.FileHandler("mail.log"))


def create_short_link(number):
    url = short_url.encode_url(number)
    return url


def encrypt_private_key(private_key: str, password: str):
    key = os.environ.get("HASH_KEY")
    password += key[:32 - len(password)]
    obj = AES.new(password.encode(), AES.MODE_CBC, key[:16].encode())
    message = private_key.encode()
    ciphertext = obj.encrypt(message)
    encrypted_private_key = binascii.hexlify(ciphertext).decode()
    return encrypted_private_key


def decrypt_private_key(encrypted_private_key: str, password: str):
    key = os.environ.get("HASH_KEY")
    password += key[:32 - len(password)]
    obj = AES.new(password.encode(), AES.MODE_CBC, key[:16].encode())
    private_key = obj.decrypt(binascii.unhexlify(encrypted_private_key.encode()))
    return private_key.decode()


def get_password_hash(password):
    password_hash = hashlib.md5(password.encode()).hexdigest()
    return password_hash


def compare_hash(password, password_hash):
    new_hash = get_password_hash(password)
    if new_hash == password_hash:
        return True
    return False


def send_email(receiver, link, name):
    port = 587
    smtp_server = "in-v3.mailjet.com"
    login = os.environ.get("EMAIL_LOGIN")
    password = os.environ.get("EMAIL_PASSWORD")

    sender = "easybip@yandex.ru"

    message = f"""\
    Subject: Hi, {name}
    To: {receiver}
    From: {sender}
    Here is your BIP link.
    {link}"""

    try:
        with smtplib.SMTP(smtp_server, port) as server:
            server.login(login, password)
            server.sendmail(sender, receiver, message)
    except (gaierror, ConnectionRefusedError):
        logger.error('Failed to connect to the server. Bad connection settings?')
        return False
    except smtplib.SMTPServerDisconnected:
        logger.error('Failed to connect to the server. Wrong user/password?')
        return False
    except smtplib.SMTPException as e:
        logger.error('SMTP error occurred: ' + str(e))
        return False
    return True
