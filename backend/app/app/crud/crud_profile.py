import shutil
import uuid
from typing import Any, Dict, Union, List

from fastapi import UploadFile
from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.user import UserProfile, User
from app.schemas.profile import ProfileUpdate, ProfileCreate


class CRUDProfile(CRUDBase[UserProfile, ProfileCreate, ProfileUpdate]):
    def create_with_owner(
        self, db: Session, *, obj_in: ProfileCreate, owner_id: int
    ) -> UserProfile:
        db_obj = UserProfile(
            user_id=owner_id,
            age=obj_in.age,
            description=obj_in.description,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self,
        db: Session,
        *,
        db_obj: UserProfile,
        obj_in: Union[ProfileUpdate, Dict[str, Any]],
    ) -> UserProfile:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)
        return super().update(db, db_obj=db_obj, obj_in=update_data)

    @staticmethod
    def save_avatar(image: UploadFile):
        filename = f'{uuid.uuid4()}.{image.filename.split(".")[-1]}'
        with open(f"static/{filename}", "wb+") as buffer:
            shutil.copyfileobj(image.file, buffer)
        return filename

    def get_by_owner(self, db: Session, owner_id):
        return db.query(UserProfile).filter(UserProfile.user_id == owner_id).first()

    def get_not_shown(self, db: Session, *, skip: int = 0, limit: int = 100, for_user: User) -> List[UserProfile]:
        showed_users = [sympathy.receiver_id for sympathy in for_user.sympathies]
        showed_users.append(for_user.id)

        user_profile = db.query(UserProfile).filter(UserProfile.user_id == for_user.id).first()
        not_shown = db.query(UserProfile).filter(UserProfile.user_id.notin_(showed_users))
        if user_profile.preferred_age_max:
            not_shown = not_shown.filter(UserProfile.age <= user_profile.preferred_age_max)
        if user_profile.preferred_age_min:
            not_shown = not_shown.filter(UserProfile.age >= user_profile.preferred_age_min)
        if user_profile.preferred_gender:
            not_shown = not_shown.filter(UserProfile.sex == user_profile.preferred_gender)

        return not_shown.offset(skip).limit(limit).all()


profile = CRUDProfile(UserProfile)
