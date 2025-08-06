from supabase import create_client
import os
from dotenv import load_dotenv

load_dotenv()

def supabase_settings():
    SUPABASE_URL = os.getenv("SUPABASE_URL")
    SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_KEY")
    supabase = create_client(str(SUPABASE_URL), str(SUPABASE_SERVICE_KEY))
    return supabase, SUPABASE_URL, SUPABASE_SERVICE_KEY
