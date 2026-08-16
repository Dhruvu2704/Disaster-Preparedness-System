from datetime import datetime

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth.jwt import get_current_user
from app.database.session import get_db
from app.models.user import User
from app.models.sos_request import SOSRequest
from app.models.damage_reports import DamageReport
from app.models.missing_person import MissingPerson
from app.models.help_requests import HelpRequest
from app.schemas.sync import SyncRequest


router = APIRouter(
    prefix="/api/sync",
    tags=["Sync"]
)


@router.post("")
def sync_pending_data(
    payload: SyncRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    synced = {
        "sos": [],
        "damage": [],
        "missing": [],
        "help": []
    }

    # -------------------------
    # SOS
    # -------------------------
    for item in payload.sos:
        record = SOSRequest(
            user_id=current_user.id,
            latitude=item.latitude,
            longitude=item.longitude,
            battery_level=item.battery_level,
            status="Received",
            created_at=datetime.utcnow(),
            received_at=datetime.utcnow()
        )

        db.add(record)
        synced["sos"].append(item.queueId)

    # -------------------------
    # DAMAGE
    # -------------------------
    for item in payload.damage:
        record = DamageReport(
            user_id=current_user.id,
            type=item.type,
            description=item.description,
            photo=item.photo,
            latitude=item.latitude,
            longitude=item.longitude,
            severity=item.severity,
            status="Reported"
        )

        db.add(record)
        synced["damage"].append(item.queueId)

    # -------------------------
    # MISSING PERSON
    # -------------------------
    for item in payload.missing:
        record = MissingPerson(
            reported_by=current_user.id,
            name=item.name,
            age=item.age,
            gender=item.gender,
            photo=item.photo,
            last_seen=item.last_seen,
            latitude=item.latitude,
            longitude=item.longitude,
            status="Missing"
        )

        db.add(record)
        synced["missing"].append(item.queueId)

    # -------------------------
    # HELP REQUEST
    # -------------------------
    for item in payload.help:
        record = HelpRequest(
            user_id=current_user.id,
            food=item.food,
            medicine=item.medicine,
            water=item.water,
            shelter=item.shelter,
            latitude=item.latitude,
            longitude=item.longitude,
            priority=item.priority,
            status="Pending"
        )

        db.add(record)
        synced["help"].append(item.queueId)

    db.commit()

    return {
        "success": True,
        "synced": synced
    }