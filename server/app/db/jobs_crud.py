from fastapi import FastAPI
from app.core.auth_settings import security, SUPABASE_JWT_SECRET, JWT_ALGORITHM
from app.core.supabase_settings import supabase, SUPABASE_URL, SUPABASE_SERVICE_KEY
import supabase

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
def insert_jobs():
    # Call clean_job_data assign the return to a simple variable name, plug it in here '{"id": 1, "title": "Pluto"}', return value is already a dictionary
    response = (supabase.table("jobs").insert({"id": 1, "title": "Pluto"}).execute())
    return response.data