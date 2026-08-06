from fastapi import FastAPI

app = FastAPI(
    title="Disaster Preparedness System",
    version="1.0.0"
)

@app.get("/")
def home():
    return {
        "message": "Disaster Preparedness System Backend Running"
    }