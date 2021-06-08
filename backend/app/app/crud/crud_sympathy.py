from typing import List

from app.crud.base import CRUDBase
from app.models.sympathy import Sympathy
from app.schemas.sympathy import SympathyCreate
from sqlalchemy.orm import Session, aliased


class CRUDSympathy(CRUDBase[Sympathy, SympathyCreate, SympathyCreate]):
    def get_mutual(self, db: Session, *, sender_id: int) -> List[Sympathy]:
        reverse_sympathy = aliased(Sympathy)
        return (
            db.query(Sympathy)
                .filter(Sympathy.sender_id == sender_id)
                .join(reverse_sympathy, Sympathy.receiver_id == reverse_sympathy.sender_id)
                .filter(Sympathy.sender_id == reverse_sympathy.receiver_id)
                .all()
        )

    def create_with_sender(self, db: Session, *, obj_in: SympathyCreate, sender_id) -> Sympathy:
        db_obj = Sympathy(sender_id=sender_id, receiver_id=obj_in.receiver_id)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj


sympathy = CRUDSympathy(Sympathy)
