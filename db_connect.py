import psycopg2
from sshtunnel import SSHTunnelForwarder

import usermenu


dbName = 'WegTrace'

with SSHTunnelForwarder(
        ('starbug.cs.rit.edu', 22),
        ssh_username="",
        ssh_password="",
        remote_bind_address=('localhost', 5432)) as server:
    server.start()
    print("SSH tunnel established")
    params = {
        'database': 'WegTrace',
        'user': 'postgres',
        'password': '',
        'host': 'localhost',
        'port': server.local_bind_port
    }
    conn = psycopg2.connect(**params)
    curs = conn.cursor()
    usermenu.menu(conn, curs)
    curs.close()
    conn.close()

print("Database connection established")