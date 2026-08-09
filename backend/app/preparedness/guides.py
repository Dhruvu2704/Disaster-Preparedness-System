from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.disaster_guide import DisasterGuide

router = APIRouter(prefix="/api/preparedness", tags=["Preparedness"])

@router.get("/guides/")
def get_guides(db: Session = Depends(get_db)):
    return db.query(DisasterGuide).all()