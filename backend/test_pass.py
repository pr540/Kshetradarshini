import mysql.connector

passwords = ["", "root", "password", "1234", "admin"]
user = "root"

for p in passwords:
    try:
        conn = mysql.connector.connect(user=user, password=p, host="localhost")
        print(f"SUCCESS: Password for {user} is '{p}'")
        conn.close()
        break
    except mysql.connector.Error as err:
        print(f"FAILED: Password '{p}' - {err}")
