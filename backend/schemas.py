from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime

class SevaBase(BaseModel):
    name: str
    location: str
    price: float
    time: str
    icon: str

class SevaCreate(SevaBase):
    pass

class Seva(SevaBase):
    id: int
    model_config = ConfigDict(from_attributes=True)

class BookingBase(BaseModel):
    user_id: int
    seva_id: int
    time_slot: str
    devotee_name: str
    num_persons: int
    total_price: float

class BookingCreate(BookingBase):
    pass

class Booking(BookingBase):
    id: int
    booking_date: Optional[datetime] = None
    status: str
    model_config = ConfigDict(from_attributes=True)
