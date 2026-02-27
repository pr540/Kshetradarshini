from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from db import get_db_connection
import schemas
import uvicorn
import mysql.connector

app = FastAPI(title="Kshetradarshini API")

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {
        "status": "online",
        "message": "Kshetradarshini API Gateway is running",
        "available_endpoints": ["/sevas", "/bookings", "/lineage"]
    }

@app.get("/lineage", response_model=List[schemas.Lineage])
def get_lineage():
    try:
        conn = get_db_connection()
        if conn is None:
            # Fallback to mock data
            return [
                {"id": 1, "name": "Acharya 1 (from API)", "image": "https://api.a0.dev/assets/image?text=hindu%20acharya%20portrait&aspect=1:1"},
                {"id": 2, "name": "Acharya 2 (from API)", "image": "https://api.a0.dev/assets/image?text=spiritual%20guru%20portrait&aspect=1:1"},
                {"id": 3, "name": "Acharya 3 (from API)", "image": "https://api.a0.dev/assets/image?text=monk%20portrait&aspect=1:1"},
                {"id": 4, "name": "Acharya 4 (from API)", "image": "https://api.a0.dev/assets/image?text=vedic%20scholar%20portrait&aspect=1:1"},
                {"id": 5, "name": "Acharya 5 (from API)", "image": "https://api.a0.dev/assets/image?text=sanyasi%20portrait&aspect=1:1"}
            ]
        
        cursor = conn.cursor(dictionary=True)
        try:
            cursor.execute("SELECT * FROM lineage")
            return cursor.fetchall()
        finally:
            cursor.close()
            conn.close()
    except Exception as e:
        print(f"ERROR IN /lineage: {e}")
        # Fallback to avoid breaking UI
        return [
                {"id": 1, "name": "Acharya 1 (from API)", "image": "https://api.a0.dev/assets/image?text=hindu%20acharya%20portrait&aspect=1:1"},
                {"id": 2, "name": "Acharya 2 (from API)", "image": "https://api.a0.dev/assets/image?text=spiritual%20guru%20portrait&aspect=1:1"},
                {"id": 3, "name": "Acharya 3 (from API)", "image": "https://api.a0.dev/assets/image?text=monk%20portrait&aspect=1:1"},
                {"id": 4, "name": "Acharya 4 (from API)", "image": "https://api.a0.dev/assets/image?text=vedic%20scholar%20portrait&aspect=1:1"},
                {"id": 5, "name": "Acharya 5 (from API)", "image": "https://api.a0.dev/assets/image?text=sanyasi%20portrait&aspect=1:1"}
            ]

@app.get("/sevas", response_model=List[schemas.Seva])
def get_sevas():
    try:
        conn = get_db_connection()
        if conn is None:
            # Fallback to mock data for demonstration
            return [
                {"id": 1, "name": "Go Seva", "location": "Kanchi Temple", "price": 500.0, "time": "Morning", "icon": "🐄"},
                {"id": 2, "name": "Veda Rakshana", "location": "Kanchi Temple", "price": 1000.0, "time": "Evening", "icon": "📿"},
                {"id": 3, "name": "Maha Rudrabhishekam", "location": "Main Shrine", "price": 1500.0, "time": "All Day", "icon": "🔱"}
            ]
            
        cursor = conn.cursor(dictionary=True)
        try:
            cursor.execute("SELECT * FROM sevas")
            return cursor.fetchall()
        finally:
            cursor.close()
            conn.close()
    except Exception as e:
        print(f"CRITICAL ERROR IN /sevas: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/bookings", status_code=status.HTTP_201_CREATED)
def create_booking(booking: schemas.BookingCreate):
    conn = get_db_connection()
    if conn is None:
        return {"id": 999, **booking.model_dump(), "status": "pending (MOCK)"}
        
    cursor = conn.cursor()
    try:
        query = """
            INSERT INTO bookings (user_id, seva_id, time_slot, devotee_name, num_persons, total_price, status)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        values = (
            booking.user_id,
            booking.seva_id,
            booking.time_slot,
            booking.devotee_name,
            booking.num_persons,
            booking.total_price,
            "pending"
        )
        cursor.execute(query, values)
        conn.commit()
        booking_id = cursor.lastrowid
        return {"id": booking_id, **booking.model_dump(), "status": "pending"}
    except mysql.connector.Error as err:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(err))
    finally:
        cursor.close()
        conn.close()

@app.get("/bookings/{user_id}", response_model=List[schemas.Booking])
def get_user_bookings(user_id: int):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM bookings WHERE user_id = %s", (user_id,))
        return cursor.fetchall()
    finally:
        cursor.close()
        conn.close()

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8082)
