import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
import os


class PostgreSQL:
    def __init__(self):
        con = psycopg2.connect(user=os.environ.get("DB_USERNAME"),
                               dbname='project',
                               password=os.environ.get("DB_PASSWORD"))

        con.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT);
        self.con = con
        self.cursor = con.cursor();

    def create_record(self, address, private_key, link, password, from_="", to="", source_link="", amount="",
                      email="", activated=0):
        self.cursor.execute(
            f"""INSERT INTO Wallets
                VALUES ('{address}', '{private_key}', '{link}', '{password}', '{from_}',
                        '{to}', '{amount}', '{email}', '{activated}', '{source_link}');
            """)

    def count_of_records(self):
        self.cursor.execute(
            f"""SELECT COUNT (Address) 
                FROM Wallets;
            """)
        return self.cursor.fetchone()[0]

    def get_record_by_source_link(self, source_link):
        self.cursor.execute(
            f"""SELECT * 
                FROM Wallets 
                WHERE SourceLink = '{source_link}';
            """
        )
        return self.__wrap_up_record(self.cursor.fetchall())

    def get_record_by_link(self, link):
        self.cursor.execute(
            f"""SELECT * 
                FROM Wallets 
                WHERE Link = '{link}';
            """
        )
        return self.__wrap_up_record(self.cursor.fetchall())

    def get_record_by_address(self, address):
        self.cursor.execute(
            f"""SELECT * 
                FROM Wallets 
                WHERE Address = '{address}';
            """
        )
        return self.__wrap_up_record(self.cursor.fetchall())

    def activate_wallet(self, address):
        self.cursor.execute(
            f"""UPDATE Wallets
                SET Activated = 1
                WHERE Address = '{address}'
            """
        )

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
