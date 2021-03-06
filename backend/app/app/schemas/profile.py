from typing import Optional

from pydantic import BaseModel


# Shared properties
class ProfileBase(BaseModel):
    description: Optional[str] = None
    age: Optional[int] = True
    sex: Optional[int] = None


class ProfileCreate(ProfileBase):
    pass


class ProfileUpdate(ProfileBase):
    pass


class ProfileInDBBase(ProfileBase):
    id: Optional[int] = None

    class Config:
        orm_mode = True


# Additional properties to return via API
class Profile(ProfileInDBBase):
    avatar: Optional[str] = ''


# Additional properties stored in DB
class ProfileInDB(ProfileInDBBase):
    pass
