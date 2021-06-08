from typing import Optional

from pydantic import BaseModel, EmailStr


# Shared properties
class SympathyBase(BaseModel):
    receiver_id: int


# Properties to receive via API on creation
class SympathyCreate(SympathyBase):
    pass


class SympathyInDBBase(SympathyBase):
    sender_id: Optional[int] = None

    class Config:
        orm_mode = True


# Additional properties to return via API
class Sympathy(SympathyInDBBase):
    pass


# Additional properties stored in DB
class SympathyInDB(SympathyInDBBase):
    pass
