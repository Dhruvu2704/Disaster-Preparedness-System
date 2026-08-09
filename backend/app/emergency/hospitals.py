from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.hospital import Hospital

router = APIRouter(prefix="/api/emergency", tags=["Emergency"])

@router.get("/hospitals/")
def get_hospitals(db: Session = Depends(get_db)):
    return db.query(Hospital).all()