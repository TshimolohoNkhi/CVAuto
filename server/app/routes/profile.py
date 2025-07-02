from fastapi import FastAPI, Request, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from utils.supabase_client import supabase
from utils.encryption import encrypt_data
import jwt
import os

app = FastAPI()
security = HTTPBearer()

SUPABASE_JWT_SECRET = os.getenv("SUPABASE_JWT_SECRET")
if SUPABASE_JWT_SECRET is None:
    raise RuntimeError("SUPABASE_JWT_SECRET environment variable is not set")

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

    # Encrypt each field
    encrypted_profile = {
        "id": user_id,  # Must match auth.users.id
        "full_name": encrypt_data(data.get("full_name", "")),
        "headline": encrypt_data(data.get("headline", "")),
        "location": encrypt_data(data.get("location", "")),
        "bio": encrypt_data(data.get("bio", "")),
    }

    # Insert into Supabase
    response = supabase.table("profiles").insert(encrypted_profile).execute()

    if not response.data:
        print("Error saving profile:", response)
        return {"status": "error", "detail": str(response)}

    return {"status": "success"}
