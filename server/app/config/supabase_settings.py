from supabase import create_client
import os
from dotenv import load_dotenv

load_dotenv()

def supabase():
    SUPABASE_URL = os.getenv("SUPABASE_URL")
    SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_KEY")
    supabase_client = create_client(str(SUPABASE_URL), str(SUPABASE_SERVICE_KEY))
    return supabase_client, SUPABASE_URL, SUPABASE_SERVICE_KEY
