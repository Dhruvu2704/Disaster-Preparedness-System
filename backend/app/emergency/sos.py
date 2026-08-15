from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from datetime import datetime
from math import radians, sin, cos, sqrt, atan2

from app.database.session import get_db
from app.models.hospital import Hospital
from app.models.shelter import Shelter


router = APIRouter(
    prefix="/api/sos",
    tags=["SOS"]
)


class SOSRequest(BaseModel):
    user_id: int
    latitude: float
    longitude: float
    message: str = "Emergency assistance required"


def calculate_distance(lat1, lon1, lat2, lon2):
    """
    Calculate distance between two GPS coordinates
    using the Haversine formula.

    Returns distance in kilometers.
    """

    earth_radius = 6371

    lat1 = radians(lat1)
    lon1 = radians(lon1)
    lat2 = radians(lat2)
    lon2 = radians(lon2)

    dlat = lat2 - lat1
    dlon = lon2 - lon1

    a = (
        sin(dlat / 2) ** 2
        + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
    )

    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    return earth_radius * c


@router.post("/")
def send_sos(
    request: SOSRequest,
    db: Session = Depends(get_db)
):

    # -----------------------------------
    # 1. GET ALL HOSPITALS
    # -----------------------------------

    hospitals = db.query(Hospital).all()

    nearest_hospital = None
    hospital_distance = None

    if hospitals:

        hospital_distances = []

        for hospital in hospitals:

            distance = calculate_distance(
                request.latitude,
                request.longitude,
                hospital.latitude,
                hospital.longitude
            )

            hospital_distances.append(
                (hospital, distance)
            )

        hospital_distances.sort(
            key=lambda x: x[1]
        )

        nearest_hospital, hospital_distance = hospital_distances[0]


    # -----------------------------------
    # 2. GET ACTIVE SHELTERS
    # -----------------------------------

    shelters = (
        db.query(Shelter)
        .filter(Shelter.status == "Active")
        .all()
    )

    nearest_shelter = None
    shelter_distance = None

    if shelters:

        shelter_distances = []

        for shelter in shelters:

            distance = calculate_distance(
                request.latitude,
                request.longitude,
                shelter.latitude,
                shelter.longitude
            )

            shelter_distances.append(
                (shelter, distance)
            )

        shelter_distances.sort(
            key=lambda x: x[1]
        )

        nearest_shelter, shelter_distance = shelter_distances[0]


    # -----------------------------------
    # 3. BUILD RESPONSE
    # -----------------------------------

    response = {
        "status": "SOS_RECEIVED",

        "message": "Emergency alert received",

        "user_id": request.user_id,

        "location": {
            "latitude": request.latitude,
            "longitude": request.longitude
        },

        "emergency_message": request.message,

        "nearest_hospital": None,

        "nearest_shelter": None,

        "timestamp": datetime.utcnow()
    }


    # -----------------------------------
    # 4. ADD NEAREST HOSPITAL
    # -----------------------------------

    if nearest_hospital:

        response["nearest_hospital"] = {
            "id": nearest_hospital.id,
            "name": nearest_hospital.name,
            "phone": nearest_hospital.phone,
            "beds_available": nearest_hospital.beds_available,
            "latitude": nearest_hospital.latitude,
            "longitude": nearest_hospital.longitude,
            "distance_km": round(hospital_distance, 2)
        }


    # -----------------------------------
    # 5. ADD NEAREST SHELTER
    # -----------------------------------

    if nearest_shelter:

        response["nearest_shelter"] = {
            "id": nearest_shelter.id,
            "name": nearest_shelter.name,
            "capacity": nearest_shelter.capacity,
            "status": nearest_shelter.status,
            "district": nearest_shelter.district,
            "latitude": nearest_shelter.latitude,
            "longitude": nearest_shelter.longitude,
            "distance_km": round(shelter_distance, 2)
        }


    return response