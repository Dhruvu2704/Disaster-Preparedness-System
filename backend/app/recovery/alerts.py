from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.alert import Alert

router = APIRouter(prefix="/api/recovery", tags=["Recovery"])

@router.get("/alerts/")
def get_alerts(db: Session = Depends(get_db)):
    return db.query(Alert).all()