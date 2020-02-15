import os

import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT


class PostgreSQL:
    def __init__(self):
        con = psycopg2.connect(user=os.environ.get("DB_USERNAME"),
                               dbname=os.environ.get("DB_NAME"),
                               password=os.environ.get("DB_PASSWORD"),
                               host="127.0.0.1",
                               port="5432")

        con.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        self.con = con

    def create_record(self, address, private_key, link, password, from_="", to="", source_link="", amount="",
                      email="", activated=0):
        cursor = self.con.cursor()
        cursor.execute(
            f"""INSERT INTO Wallets
                VALUES ('{address}', '{private_key}', '{link}', '{password}', '{from_}',
                        '{to}', '{amount}', '{email}', '{activated}', '{source_link}');
            """)
        cursor.close()

    def count_of_records(self):
        cursor = self.con.cursor()
        cursor.execute(
            f"""SELECT COUNT (Address) 
                FROM Wallets;
            """)
        res = cursor.fetchone()[0]
        cursor.close()
        return res

    def get_record_by_source_link(self, source_link):
        cursor = self.con.cursor()
        cursor.execute(
            f"""SELECT * 
                FROM Wallets 
                WHERE SourceLink = '{source_link}';
            """
        )
        res = self.__wrap_up_record(cursor.fetchall())
        cursor.close()
        return res

    def get_record_by_link(self, link):
        cursor = self.con.cursor()
        cursor.execute(
            f"""SELECT * 
                FROM Wallets 
                WHERE Link = '{link}';
            """
        )
        res = self.__wrap_up_record(cursor.fetchall())
        cursor.close()
        return res

    def get_record_by_address(self, address):
        cursor = self.con.cursor()
        cursor.execute(
            f"""SELECT * 
                FROM Wallets 
                WHERE Address = '{address}';
            """
        )
        res = self.__wrap_up_record(cursor.fetchall())
        cursor.close()
        return res

    def activate_wallet(self, address):
        cursor = self.con.cursor()
        cursor.execute(
            f"""UPDATE Wallets
                SET Activated = 1
                WHERE Address = '{address}'
            """
        )
        cursor.close()

    def __wrap_up_record(self, records):
        if len(records) == 1:
            record = records[0]
            return {"address": record[0], "private_key": record[1], "link": record[2], "password": record[3],
                    "from_": record[4], "to": record[5], "amount": record[6], "email": record[7],
                    "activated": record[8], "source_link": record[9]}
        elif len(records) > 1:
            wrapped_records = []
            for record in records:
                wrapped_records.append(
                    {"address": record[0], "private_key": record[1], "link": record[2], "password": record[3],
                     "from_": record[4], "to": record[5], "amount": record[6], "email": record[7],
                     "activated": record[8], "source_link": record[9]})
            return wrapped_records
        else:
            return None
