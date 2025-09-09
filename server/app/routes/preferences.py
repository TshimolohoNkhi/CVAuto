from fastapi import FastAPI, Request, Depends
from fastapi.security import HTTPBearer
from ..config.supabase_settings import supabase
from ..config.security import Encryption
from ..utils.conversions import Conversions
from ..api.v1.auth import verify_token
import json

app = FastAPI()
security = HTTPBearer()
encrypt_data = Encryption.encrypt_data

@app.post("/server/save_preferences")
async def save_preferences(request: Request, token_data=Depends(verify_token)):

    raw_body = await request.body()

    raw_json = raw_body.decode("utf-8")
    """
    Encrypts the raw JSON data and saves it to the 'user_preferences' table.
    """
    encrypted_raw_json = encrypt_data(raw_json)

    try:
        response = supabase.table("user_preferences").insert({
            "id": token_data["sub"],
            "json_format": encrypted_raw_json
        }).execute()
    except Exception as e:
        print("Error saving 'encrypted_raw_json' to 'json_format':", e)
        return {"status": "error", "detail": str(e)}
    
    """
    Converts the raw JSON data to a prompt format, encrypts the prompt format and saves it to the 'prompt_format' column.
    """
    prompt = Conversions().convert_preferences_to_prompt(raw_json)
    encrypted_prompt = encrypt_data(prompt)

    try:
        response = supabase.table("user_preferences").update({
            "prompt_format": encrypted_prompt
        }).eq("id", token_data["sub"]).execute()
    except Exception as e:
        print("Error updating 'prompt_format' in 'user_preferences':", e)
        return {"status": "error", "detail": str(e)}

    """
    Coverts the prompt format into a vector embedding, encrypts the vector embedding and saves it to the 'vector_embedding' column.
    """
    vector_embedding = Conversions().convert_prompt_to_vector(prompt)
    encrypted_vector_embedding = encrypt_data(vector_embedding.tolist())

    try:
        response = supabase.table("user_preferences").update({
            "vector_embedding": encrypted_vector_embedding
        }).eq("id", token_data["sub"]).execute()
    except Exception as e:
        print("Error updating 'vector_embedding' in 'user_preferences':", e)
        return {"status": "error", "detail": str(e)}

    data = await request.json()
    user_id = token_data["sub"]

    # You may need to expand on this
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

    # Insert into Supabase
    response = supabase.table("preferences").insert(encrypted_preferences).execute()

    if not response.data:
        print("Error saving preferences:", response)
        return {"status": "error", "detail": str(response)}

    return {"status": "success"}
