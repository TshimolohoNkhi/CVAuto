from fastapi.security import HTTPBearer
import os

@staticmethod
def get_auth_settings():
    security = HTTPBearer()
    SUPABASE_JWT_SECRET = os.getenv("SUPABASE_JWT_SECRET")
    JWT_ALGORITHM = "HS256"
    return security, SUPABASE_JWT_SECRET, JWT_ALGORITHM