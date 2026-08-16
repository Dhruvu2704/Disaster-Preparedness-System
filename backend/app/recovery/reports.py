from typing import Optional

from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.user import User
from app.models.damage_reports import DamageReport
from app.models.missing_person import MissingPerson
from app.auth.jwt import get_current_user


router = APIRouter(tags=["Recovery"])


# =========================================================
# DAMAGE REPORT
# =========================================================

class DamageReportCreate(BaseModel):
    type: str
    description: Optional[str] = None
    photo: Optional[str] = None
    latitude: float
    longitude: float
    severity: Optional[str] = "Medium"


class DamageReportResponse(BaseModel):
    id: int
    user_id: Optional[int]
    type: str
    description: Optional[str]
    photo: Optional[str]
    latitude: float
    longitude: float
    severity: Optional[str]
    status: str

    class Config:
        from_attributes = True


@router.post(
    "/api/damage",
    response_model=DamageReportResponse
)
def create_damage_report(
    report: DamageReportCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    new_report = DamageReport(
        user_id=current_user.id,
        type=report.type,
        description=report.description,
        photo=report.photo,
        latitude=report.latitude,
        longitude=report.longitude,
        severity=report.severity,
        status="Reported"
    )

    db.add(new_report)
    db.commit()
    db.refresh(new_report)

    return new_report


@router.get(
    "/api/damage",
    response_model=list[DamageReportResponse]
)
def get_damage_reports(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    return (
        db.query(DamageReport)
        .order_by(DamageReport.id.desc())
        .all()
    )


# =========================================================
# MISSING PERSON
# =========================================================

class MissingPersonCreate(BaseModel):
    name: str
    age: Optional[int] = None
    gender: Optional[str] = None
    photo: Optional[str] = None
    last_seen: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None


class MissingPersonResponse(BaseModel):
    id: int
    reported_by: Optional[int]
    name: str
    age: Optional[int]
    gender: Optional[str]
    photo: Optional[str]
    last_seen: Optional[str]
    latitude: Optional[float]
    longitude: Optional[float]
    status: str

    class Config:
        from_attributes = True


@router.post(
    "/api/missing",
    response_model=MissingPersonResponse
)
def create_missing_person_report(
    report: MissingPersonCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    new_report = MissingPerson(
        reported_by=current_user.id,
        name=report.name,
        age=report.age,
        gender=report.gender,
        photo=report.photo,
        last_seen=report.last_seen,
        latitude=report.latitude,
        longitude=report.longitude,
        status="Missing"
    )

    db.add(new_report)
    db.commit()
    db.refresh(new_report)

    return new_report


@router.get(
    "/api/missing",
    response_model=list[MissingPersonResponse]
)
def get_missing_persons(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    return (
        db.query(MissingPerson)
        .order_by(MissingPerson.id.desc())
        .all()
    )