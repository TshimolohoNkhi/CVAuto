from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from fastapi import FastAPI, Depends, HTTPException, Security
from jwt import decode, ExpiredSignatureError, InvalidTokenError
from supabase import create_client
from pydantic import BaseModel
from typing import Optional
import os

# FastAPI app
app = FastAPI()

# Auth settings
security = HTTPBearer()
SUPABASE_JWT_SECRET = os.getenv("SUPABASE_JWT_SECRET")
JWT_ALGORITHM = "HS256"

# Supabase client
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
supabase = create_client(str(SUPABASE_URL), str(SUPABASE_SERVICE_ROLE_KEY))

# Output schema
class UserOut(BaseModel):
    id: str
    name: Optional[str] = None
    email: Optional[str] = None

# Token verifier
def verify_token(credentials: HTTPAuthorizationCredentials = Security(security)):
    token = credentials.credentials
    try:
        payload = decode(token, str(SUPABASE_JWT_SECRET), algorithms=[JWT_ALGORITHM])
        return payload
    except ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except InvalidTokenError:
        raise HTTPException(status_code=403, detail="Invalid token")

# Profile fetcher (optional)
def retrieve_user_profile(user_id: str):
    response = supabase.table("profiles").select("*").eq("id", user_id).single().execute()
    error = getattr(response, "error", None)
    if error:
        raise HTTPException(status_code=500, detail=f"Database error: {error.message}")
    if not response.data:
        raise HTTPException(status_code=404, detail="User profile not found")
    return response.data

# Protected route example
@app.get("/me", response_model=UserOut)
def read_me(payload=Depends(verify_token)):
    user_id = payload.get("sub")
    email = payload.get("email")

    # Fetch profile info from Supabase
    profile = retrieve_user_profile(user_id)

    return UserOut(id=user_id, name=profile.get("fullname"), email=email)


