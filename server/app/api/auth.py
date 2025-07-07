from fastapi import FastAPI, Depends, HTTPException, status, Security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext
from datetime import datetime, timedelta
import jwt
import os
from typing import Optional
from jwt.exceptions import InvalidTokenError

app = FastAPI()

security = HTTPBearer()
SUPABASE_JWT_SECRET = os.getenv("SUPABASE_JWT_SECRET")
JWT_ALGORITHM = "HS256"
JWT_EXP_MINUTES = 60

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta if expires_delta else timedelta(minutes=JWT_EXP_MINUTES))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, str(SUPABASE_JWT_SECRET), algorithm=JWT_ALGORITHM)
    return encoded_jwt

def verify_token(credentials: HTTPAuthorizationCredentials = Security(security)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, str(SUPABASE_JWT_SECRET), algorithms=[JWT_ALGORITHM])
        return payload
    except InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid or expired token")

# User models
class SignupData(BaseModel):
    email: EmailStr
    password: str
    name: Optional[str]

class LoginData(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: str
    name: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserOut

# In-memory "database" for demo purposes only
fake_db = {}

# Signup endpoint
@app.post("/signup", response_model=UserOut)
def signup(signup_data: SignupData):
    if signup_data.email in fake_db:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    hashed_pw = hash_password(signup_data.password)
    user_id = str(len(fake_db) + 1)
    fake_db[signup_data.email] = {
        "id": user_id,
        "email": signup_data.email,
        "hashed_password": hashed_pw,
        "name": signup_data.name,
    }
    return UserOut(id=user_id, name=str(signup_data.name)) 

# Login endpoint
@app.post("/login", response_model=TokenResponse)
def login(login_data: LoginData):
    user = fake_db.get(login_data.email)
    if not user or not verify_password(login_data.password, user["hashed_password"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    
    access_token = create_access_token({"sub": user["id"], "email": user["email"]})
    user_out = UserOut(id=user["id"], name=user["name"])
    return TokenResponse(access_token=access_token, token_type="bearer", user=user_out)

# Protected route example
@app.get("/me", response_model=UserOut)
def read_me(payload=Depends(verify_token)):
    user_email = payload.get("email")
    user = fake_db.get(user_email)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return UserOut(id=user["id"], name=user["name"])


