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

@app.post("/server/save_profile")
async def save_profile(request: Request, token_data=Depends(verify_token)):
    data = await request.json()
    user_id = token_data["sub"]

    encrypted_profile = {
        "id": user_id,
        "fullName": encrypt_data(data.get("fullName", "")),
        "email": encrypt_data(data.get("email", "")),
        "phone": encrypt_data(data.get("phone", "")),
        "city": encrypt_data(data.get("city", "")),
        "province": encrypt_data(data.get("province", "")),
        "postalCode": encrypt_data(data.get("postalCode", "")),
        "address": encrypt_data(data.get("address", "")),

        # Serialize arrays/objects as JSON before encryption
        "skills": encrypt_data(json.dumps(data.get("skills", []))),
        "languages": encrypt_data(json.dumps(data.get("languages", []))),
        "education": encrypt_data(json.dumps(data.get("education", []))),
        "workExperience": encrypt_data(json.dumps(data.get("workExperience", []))),
    }

    # Insert into Supabase
    response = supabase.table("profiles").insert(encrypted_profile).execute()

    if not response.data:
        print("Error saving profile:", response)
        return {"status": "error", "detail": str(response)}

    return {"status": "success"}
