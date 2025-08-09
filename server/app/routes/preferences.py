from fastapi import FastAPI, Request, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from config.supabase_settings import supabase
from config.security import encrypt_data
from utils.conversions import Conversions
import jwt
import os
import json

app = FastAPI()
security = HTTPBearer()

SUPABASE_JWT_SECRET = os.getenv("SUPABASE_JWT_SECRET")
if SUPABASE_JWT_SECRET is None:
    raise RuntimeError("SUPABASE_JWT_SECRET environment variable is not set")

# Call verify_token from auth.py in api/v1
def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, str(SUPABASE_JWT_SECRET), algorithms=["HS256"])
        return payload
    except jwt.PyJWTError:
        raise HTTPException(status_code=403, detail="Invalid token")

@app.post("/server/save_preferences")
async def save_preferences(request: Request, token_data=Depends(verify_token)):
    #  Read the raw body of the request
    raw_body = await request.body()
    #  Decode the raw body
    raw_json = raw_body.decode("utf-8")

    #  Encrypt the raw JSON data
    encrypted_raw_json = encrypt_data(raw_json)
    # Save the encrypted raw JSON to the 'json_format' column along with user ID
    try:
        response = supabase.table("user_preferences").insert({
            "id": token_data["sub"],
            "json_format": encrypted_raw_json
        }).execute()
    except Exception as e:
        print("Error saving 'encrypted_raw_json' to 'json_format':", e)
        return {"status": "error", "detail": str(e)}
    
    prompt = Conversions().convert_preferences_to_prompt(raw_json)
    encrypted_prompt = encrypt_data(prompt)

    try:
        response = supabase.table("user_preferences").update({
            "prompt_format": encrypted_prompt
        }).eq("id", token_data["sub"]).execute()
    except Exception as e:
        print("Error updating 'prompt_format' in 'user_preferences':", e)
        return {"status": "error", "detail": str(e)}

    data = await request.json()
    user_id = token_data["sub"]

    encrypted_preferences = {
        "id": user_id,
        "preferredLocations": encrypt_data(json.dumps(data.get("preferredLocations", []))),
        "preferredIndustries": encrypt_data(json.dumps(data.get("preferredIndustries", []))),
        "criminalRecord": encrypt_data(data.get("criminalRecord", "")),
        "willingToWorkWithRecord": encrypt_data(json.dumps(data.get("willingToWorkWithRecord", False))),
        "jobTypes": encrypt_data(json.dumps(data.get("jobTypes", []))),
        "salaryMin": encrypt_data(str(data.get("salaryMin", 0))),
        "salaryMax": encrypt_data(str(data.get("salaryMax", 0))),
        "educationLevel": encrypt_data(data.get("educationLevel", "")),
        "languagesSpoken": encrypt_data(json.dumps(data.get("languagesSpoken", []))),
        "availability": encrypt_data(data.get("availability", "")),
        "disabilityFriendly": encrypt_data(json.dumps(data.get("disabilityFriendly", False))),
        "remoteOnly": encrypt_data(json.dumps(data.get("remoteOnly", False))),
    }

    # Store JSON and embedded vector in Supabase (same should be done for profile)

    # Insert into Supabase
    response = supabase.table("preferences").insert(encrypted_preferences).execute()

    if not response.data:
        print("Error saving preferences:", response)
        return {"status": "error", "detail": str(response)}

    return {"status": "success"}
