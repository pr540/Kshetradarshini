from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from .db import Base
import datetime

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    email = Column(String(100), unique=True, index=True)
    password_hash = Column(String(255))
    role = Column(String(20), default="user")

class Seva(Base):
    __tablename__ = "sevas"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255))
    location = Column(String(255))
    price = Column(Float)
    time = Column(String(50))
    icon = Column(String(50)) # Emoji or URL

class Booking(Base):
    __tablename__ = "bookings"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    seva_id = Column(Integer, ForeignKey("sevas.id"))
    booking_date = Column(DateTime, default=datetime.datetime.utcnow)
    time_slot = Column(String(50))
    devotee_name = Column(String(100))
    num_persons = Column(Integer)
    total_price = Column(Float)
    status = Column(String(20), default="pending") # pending, confirmed, cancelled

    user = relationship("User")
    seva = relationship("Seva")
