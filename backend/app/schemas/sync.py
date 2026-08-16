from typing import Optional
from pydantic import BaseModel, Field


class SOSSyncItem(BaseModel):
    queueId: int
    latitude: float
    longitude: float
    battery_level: Optional[int] = None
    status: str = "pending"
    queuedAt: Optional[str] = None


class DamageSyncItem(BaseModel):
    queueId: int
    type: str
    description: Optional[str] = None
    photo: Optional[str] = None
    latitude: float
    longitude: float
    severity: Optional[str] = None
    status: str = "pending"
    queuedAt: Optional[str] = None


class MissingSyncItem(BaseModel):
    queueId: int
    name: str
    age: Optional[int] = None
    gender: Optional[str] = None
    photo: Optional[str] = None
    last_seen: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    status: str = "pending"
    queuedAt: Optional[str] = None


class HelpSyncItem(BaseModel):
    queueId: int
    food: bool = False
    medicine: bool = False
    water: bool = False
    shelter: bool = False
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    priority: str = "Medium"
    status: str = "pending"
    queuedAt: Optional[str] = None


class SyncRequest(BaseModel):
    sos: list[SOSSyncItem] = Field(default_factory=list)
    damage: list[DamageSyncItem] = Field(default_factory=list)
    missing: list[MissingSyncItem] = Field(default_factory=list)
    help: list[HelpSyncItem] = Field(default_factory=list)