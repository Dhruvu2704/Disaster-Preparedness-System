from pydantic import BaseModel

class PreparednessChecklistOut(BaseModel):
    id: int
    disaster_type: str
    item: str
    priority: int

    class Config:
        from_attributes = True