import os
import mysql.connector
from mysql.connector import pooling

# Environment configuration for Docker / local development
db_config = {
    "host": os.getenv("DB_HOST", "localhost"),
    "user": os.getenv("DB_USER", "root"),
    "password": os.getenv("DB_PASSWORD", "root"),
    "database": os.getenv("DB_NAME", "kshetradarshini"),
    "port": int(os.getenv("DB_PORT", "3306"))
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
        print("SUCCESS: MySQL Connection Pool Initialized")
    except mysql.connector.Error as err:
        print(f"ERROR creating connection pool: {err}")

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
        print("WARNING: MySQL failed. Switching to MOCK MODE.")
        MOCK_MODE = True
        return None
        
    try:
        return connection_pool.get_connection()
    except Exception as e:
        print(f"WARNING: MySQL connection failed: {e}. Switching to MOCK MODE.")
        MOCK_MODE = True
        return None
