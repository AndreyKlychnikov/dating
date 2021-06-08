from typing import Any, List

from app import models, schemas, crud
from app.api import deps
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

router = APIRouter()


@router.post("/", response_model=schemas.Sympathy)
def create_sympathy(
    *,
    db: Session = Depends(deps.get_db),
    sympathy_in: schemas.SympathyCreate,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Create new sympathy.
    """
    return crud.sympathy.create_with_sender(
        db, obj_in=sympathy_in, sender_id=current_user.id
    )


@router.get("/", response_model=List[schemas.Sympathy])
def get_mutual_sympathy(
    *,
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Get mutual sympathies.
    """
    return crud.sympathy.get_mutual(db, sender_id=current_user.id)
