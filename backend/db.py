import mysql.connector
from mysql.connector import pooling

# Update with your actual MySQL credentials
db_config = {
    "host": "localhost",
    "user": "root",
    "password": "root",
    "database": "kshetradarshini"
}

connection_pool = None

def init_pool():
    global connection_pool
    try:
        connection_pool = pooling.MySQLConnectionPool(
            pool_name="mypool",
            pool_size=5,
            **db_config
        )
        print("✅ MySQL Connection Pool Initialized")
    except mysql.connector.Error as err:
        print(f"❌ Error creating connection pool: {err}")

# Initialize pool on module load
init_pool()

MOCK_MODE = False

def get_db_connection():
    global MOCK_MODE
    if MOCK_MODE:
        return None
        
    if connection_pool is None:
        init_pool()
    if connection_pool is None:
        print("⚠️ MySQL failed. Switching to MOCK MODE.")
        MOCK_MODE = True
        return None
    try:
        return connection_pool.get_connection()
    except:
        print("⚠️ MySQL connection failed. Switching to MOCK MODE.")
        MOCK_MODE = True
        return None
