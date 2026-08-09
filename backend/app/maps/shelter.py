from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.shelter import Shelter

router = APIRouter(prefix="/api/maps/shelters", tags=["Shelters"])

@router.get("/")
def get_shelters(db: Session = Depends(get_db)):
    return db.query(Shelter).all()