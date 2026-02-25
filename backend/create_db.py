import mysql.connector
from mysql.connector import errorcode

def init_db():
    try:
        # Connect without database first
        cnx = mysql.connector.connect(user='root', password='root', host='localhost')
        cursor = cnx.cursor()
        
        # Create DB
        cursor.execute("CREATE DATABASE IF NOT EXISTS kshetradarshini")
        cursor.execute("USE kshetradarshini")
        
        # Create Tables
        tables = {}
        tables['users'] = (
            "CREATE TABLE IF NOT EXISTS `users` ("
            "  `id` int(11) NOT NULL AUTO_INCREMENT,"
            "  `name` varchar(100) NOT NULL,"
            "  `email` varchar(100) NOT NULL,"
            "  `password_hash` varchar(255) NOT NULL,"
            "  `role` varchar(20) DEFAULT 'user',"
            "  PRIMARY KEY (`id`),"
            "  UNIQUE KEY `email` (`email`)"
            ") ENGINE=InnoDB")

        tables['sevas'] = (
            "CREATE TABLE IF NOT EXISTS `sevas` ("
            "  `id` int(11) NOT NULL AUTO_INCREMENT,"
            "  `name` varchar(255) NOT NULL,"
            "  `location` varchar(255) NOT NULL,"
            "  `price` float NOT NULL,"
            "  `time` varchar(50) NOT NULL,"
            "  `icon` varchar(50) NOT NULL,"
            "  PRIMARY KEY (`id`)"
            ") ENGINE=InnoDB")

        tables['bookings'] = (
            "CREATE TABLE IF NOT EXISTS `bookings` ("
            "  `id` int(11) NOT NULL AUTO_INCREMENT,"
            "  `user_id` int(11) NOT NULL,"
            "  `seva_id` int(11) NOT NULL,"
            "  `booking_date` datetime DEFAULT CURRENT_TIMESTAMP,"
            "  `time_slot` varchar(50) NOT NULL,"
            "  `devotee_name` varchar(100) NOT NULL,"
            "  `num_persons` int(11) NOT NULL,"
            "  `total_price` float NOT NULL,"
            "  `status` varchar(20) DEFAULT 'pending',"
            "  PRIMARY KEY (`id`)"
            ") ENGINE=InnoDB")

        for name, ddl in tables.items():
            print(f"Creating table {name}: ", end='')
            try:
                cursor.execute(ddl)
                print("OK")
            except mysql.connector.Error as err:
                if err.errno == errorcode.ER_TABLE_EXISTS_ERROR:
                    print("already exists.")
                else:
                    print(err.msg)
        
        cnx.close()
    except mysql.connector.Error as err:
        print(f"Failed: {err}")

if __name__ == "__main__":
    init_db()
