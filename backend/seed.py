import mysql.connector

def seed():
    try:
        try:
            conn = mysql.connector.connect(
                host="localhost",
                user="root",
                password="root",
                database="kshetradarshini"
            )
        except:
            conn = mysql.connector.connect(
                host="localhost",
                user="root",
                password="",
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
            print("Seeding sevas complete.")
        else:
            print("Sevas already seeded.")

        # Check if lineage exist
        cursor.execute("SELECT count(*) FROM lineage")
        l_count = cursor.fetchone()[0]
        if l_count == 0:
            print("Seeding lineage...")
            lineage = [
                ("Acharya 1", "https://api.a0.dev/assets/image?text=hindu%20acharya%20portrait&aspect=1:1"),
                ("Acharya 2", "https://api.a0.dev/assets/image?text=spiritual%20guru%20portrait&aspect=1:1"),
                ("Acharya 3", "https://api.a0.dev/assets/image?text=monk%20portrait&aspect=1:1"),
                ("Acharya 4", "https://api.a0.dev/assets/image?text=vedic%20scholar%20portrait&aspect=1:1"),
                ("Acharya 5", "https://api.a0.dev/assets/image?text=sanyasi%20portrait&aspect=1:1"),
            ]
            l_query = "INSERT INTO lineage (name, image) VALUES (%s, %s)"
            cursor.executemany(l_query, lineage)
            conn.commit()
            print("Seeding lineage complete.")
        else:
            print("Lineage already seeded.")
            
        conn.close()
    except mysql.connector.Error as err:
        print(f"Error: {err}")

if __name__ == "__main__":
    seed()
