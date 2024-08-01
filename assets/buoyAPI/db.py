import pymysql

conn = pymysql.connect(
    host='sql7.freesqldatabase.com',
    database='sql7723419',
    user='sql7723419',
    password='nPlFTnXHwg',
    charset='utf8mb4',
    cursorclass=pymysql.cursors.DictCursor
)

cursor = conn.cursor()

sql_query = """ CREATE TABLE buoy ( 
    id integer PRIMARY KEY,
    name text NOT NULL,
    x FLOAT NOT NULL,
    y FLOAT NOT NULL
)"""

cursor.execute(sql_query)
conn.close()