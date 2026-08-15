from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.preparedness_checklist import PreparednessChecklist

router = APIRouter(prefix="/api/preparedness", tags=["Preparedness"])

@router.get("/checklist")
def get_checklist(disaster_type: str, db: Session = Depends(get_db)):
    return (
        db.query(PreparednessChecklist)
        .order_by(PreparednessChecklist.id.asc())
        .all()
    )