from fastapi import Depends, HTTPException, Security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
import jwt
from jwt.exceptions import InvalidTokenError

security = HTTPBearer()

SUPABASE_JWT_SECRET = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imprdm5oYmh6bnV5aW5wbnh6YXppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyOTkwMDIsImV4cCI6MjA2Njg3NTAwMn0.EYWOIivzy-HrzcgS12dHkYCA05bhr9uA-pRmcL3lzxg"

def verify_token(credentials: HTTPAuthorizationCredentials = Security(security)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SUPABASE_JWT_SECRET, algorithms=["HS256"], audience="your-audience", options={"verify_exp": True})
        return payload
    except InvalidTokenError:
        raise HTTPException(status_code=403, detail="Invalid or expired token")

