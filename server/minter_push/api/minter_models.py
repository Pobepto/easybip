from typing import List, Dict

from pydantic import BaseModel


class User(BaseModel):
    email: str = ""
    fullname: str = ""
    amount: str


class SendToSingleUser(BaseModel):
    from_: str = ""
    to: str = ""
    password: str = ""


class SendToSeveralUsers(BaseModel):
    from_: str = ""
    users: List[User]
    password: str = ""


class SendBIPTransaction(BaseModel):
    link: str
    to: str
    password: str = ""
    amount: str
    payload: str


class CheckPassword(BaseModel):
    link: str
    password: str


class Gift(BaseModel):
    gift_name: str
    link: str