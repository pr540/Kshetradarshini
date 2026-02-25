import mysql.connector

def seed():
    try:
        conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="root",
            database="kshetradarshini"
        )
        cursor = conn.cursor()
        
        # Check if sevas exist
        cursor.execute("SELECT count(*) FROM sevas")
        count = cursor.fetchone()[0]
        
        if count == 0:
            print("Seeding sevas...")
            sevas = [
                ("Go Seva", "Kanchipeetam Temple", 500.0, "Morning", "🐄"),
                ("Veda Rakshana", "Kanchipeetam Temple", 1000.0, "Evening", "📿"),
                ("Aalya Seva", "Kanchipeetam Temple", 750.0, "All Day", "🏛️"),
                ("Maha Rudrabhishekam", "Kanchipeetam Temple", 1500.0, "Weekend", "🔱"),
            ]
            query = "INSERT INTO sevas (name, location, price, time, icon) VALUES (%s, %s, %s, %s, %s)"
            cursor.executemany(query, sevas)
            conn.commit()
            print("Seeding complete.")
        else:
            print("Sevas already seeded.")
            
        conn.close()
    except mysql.connector.Error as err:
        print(f"Error: {err}")

if __name__ == "__main__":
    seed()
