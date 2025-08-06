from fastapi import FastAPI, Request, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from utils.supabase_client import supabase
from utils.encryption import encrypt_data
import jwt
import os
import json

app = FastAPI()
security = HTTPBearer()

SUPABASE_JWT_SECRET = os.getenv("SUPABASE_JWT_SECRET")
if SUPABASE_JWT_SECRET is None:
    raise RuntimeError("SUPABASE_JWT_SECRET environment variable is not set")

# Call verify_token from auth.py in api/v1
def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, str(SUPABASE_JWT_SECRET), algorithms=["HS256"])
        return payload
    except jwt.PyJWTError:
        raise HTTPException(status_code=403, detail="Invalid token")

@app.post("/server/save_preferences")
async def save_preferences(request: Request, token_data=Depends(verify_token)):
    data = await request.json()
    user_id = token_data["sub"]

    encrypted_preferences = {
        "id": user_id,
        "preferredLocations": encrypt_data(json.dumps(data.get("preferredLocations", []))),
        "preferredIndustries": encrypt_data(json.dumps(data.get("preferredIndustries", []))),
        "criminalRecord": encrypt_data(data.get("criminalRecord", "")),
        "willingToWorkWithRecord": encrypt_data(json.dumps(data.get("willingToWorkWithRecord", False))),
        "jobTypes": encrypt_data(json.dumps(data.get("jobTypes", []))),
        "salaryMin": encrypt_data(str(data.get("salaryMin", 0))),
        "salaryMax": encrypt_data(str(data.get("salaryMax", 0))),
        "educationLevel": encrypt_data(data.get("educationLevel", "")),
        "languagesSpoken": encrypt_data(json.dumps(data.get("languagesSpoken", []))),
        "availability": encrypt_data(data.get("availability", "")),
        "disabilityFriendly": encrypt_data(json.dumps(data.get("disabilityFriendly", False))),
        "remoteOnly": encrypt_data(json.dumps(data.get("remoteOnly", False))),
    }

    # Insert into Supabase
    response = supabase.table("preferences").insert(encrypted_preferences).execute()

    if not response.data:
        print("Error saving preferences:", response)
        return {"status": "error", "detail": str(response)}

    return {"status": "success"}
