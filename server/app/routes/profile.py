from fastapi import FastAPI, Request, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
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

    # Save profile to your DB using user_id
    print(f"Saving profile for user: {user_id}, data: {data}")
    return {"status": "success"}
