from fastapi import FastAPI
from app.core.auth_settings import security, SUPABASE_JWT_SECRET, JWT_ALGORITHM
from app.core.supabase_settings import supabase, SUPABASE_URL, SUPABASE_SERVICE_KEY

# FastAPI app
app = FastAPI()

# Auth settings
security = security
SUPABASE_JWT_SECRET = SUPABASE_JWT_SECRET
JWT_ALGORITHM = JWT_ALGORITHM

# Supabase client
SUPABASE_URL = SUPABASE_URL
SUPABASE_SERVICE_KEY = SUPABASE_SERVICE_KEY
supabase = supabase

# Pull job portal links from Supabase
@staticmethod
def get_job_portal_links():
    response = supabase.table("recruiters").select("job_portal").execute()
    return response.data
