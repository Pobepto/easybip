from typing import List, Dict

from pydantic import BaseModel


class SendToSingleUser(BaseModel):
    from_: str = ""
    to: str = ""
    amount: str = ""
    password: str = ""


class SendToSeveralUsers(BaseModel):
    from_: str
    users: List[Dict]
    password: str = ""


class SendBIPTransaction(BaseModel):
    link: str
    to: str
    password: str = ""
    amount: str


class CheckPassword(BaseModel):
    link: str
    password: str
