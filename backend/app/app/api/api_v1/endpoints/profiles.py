from typing import Any

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session

from app import models, schemas, crud
from app.api import deps

router = APIRouter()


@router.post("/", response_model=schemas.Profile)
def create_profile(
    *,
    db: Session = Depends(deps.get_db),
    profile_in: schemas.ProfileCreate,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Create new profile.
    """
    profile = crud.profile.get_by_owner(db, owner_id=current_user.id)
    if profile:
        raise HTTPException(
            status_code=400,
            detail="The profile for this user already exists in the system.",
        )
    return crud.profile.create_with_owner(
        db, obj_in=profile_in, owner_id=current_user.id
    )


@router.put("/", response_model=schemas.Profile)
def update_my_profile(
    *,
    db: Session = Depends(deps.get_db),
    profile_in: schemas.ProfileUpdate,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Update own profile.
    """
    profile = crud.profile.update(db, db_obj=current_user.profile, obj_in=profile_in)
    return profile


@router.post("/upload_avatar", response_model=schemas.Profile)
def upload_avatar(
    *,
    img: UploadFile = File(...),
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user),
):
    """
    Upload avatar for own profile
    """
    # Todo: add deleting old file
    filename = crud.profile.save_avatar(img)
    profile = crud.profile.update(
        db, db_obj=current_user.profile, obj_in={"avatar": filename}
    )
    return profile


@router.get("/me", response_model=schemas.Profile)
def read_user_me(
    db: Session = Depends(deps.get_db),
    current_user: models.UserProfile = Depends(deps.get_current_active_user),
) -> Any:
    """
    Get current profile.
    """
    return current_user.profile
