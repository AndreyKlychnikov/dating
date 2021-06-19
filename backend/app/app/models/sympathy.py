from typing import TYPE_CHECKING

from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, SmallInteger
from sqlalchemy.orm import relationship, backref

from app import models
from app.db.base_class import Base


class Sympathy(Base):
    sender_id = Column(Integer, ForeignKey('user.id'), primary_key=True)
    receiver_id = Column(Integer, ForeignKey('user.id'), primary_key=True)
    sender = relationship(models.User, backref="sympathies", foreign_keys=[sender_id])
    receiver = relationship(models.User, backref="input_sympathies", foreign_keys=[receiver_id])
