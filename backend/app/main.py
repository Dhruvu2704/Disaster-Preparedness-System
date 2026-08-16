from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.session import Base, engine
from app.models.user import User
from app.auth.register import router as register_router
from app.auth.login import router as login_router
from app.recovery.reports import router as recovery_reports_router
from app.maps.shelter import router as shelters_router
from app.emergency.hospitals import router as hospital_router
from app.recovery.alerts import router as alerts_router
from app.preparedness.guides import router as guides_router
from app.preparedness.checklist import router as checklist_router
from app.emergency.sos import router as sos_router
from app.sync.sync import router as sync_router

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="ResQNet API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include auth routes
app.include_router(register_router)
app.include_router(recovery_reports_router)
app.include_router(shelters_router)
app.include_router(login_router)
app.include_router(hospital_router)
app.include_router(alerts_router)
app.include_router(guides_router)
app.include_router(sync_router)
app.include_router(checklist_router)
app.include_router(sos_router)

@app.get("/")
def home():
    return {"message": "ResQNet backend is running"}