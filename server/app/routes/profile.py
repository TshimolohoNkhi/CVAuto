from fastapi import FastAPI, Request, Depends
from fastapi.security import HTTPBearer
from config.supabase_settings import supabase
from config.security import Encryption
from utils.conversions import Conversions
from api.v1.auth import verify_token
import json

app = FastAPI()
security = HTTPBearer()
encrypt_data = Encryption.encrypt_data

@app.post("/server/save_profile")
async def save_profile(request: Request, token_data=Depends(verify_token)):
    
    data = await request.json()
    raw_json = data.decode("utf-8")

    """
    Encrypts the raw JSON data and saves it to the 'user_profile' table.
    """
    encrypted_raw_json = encrypt_data(raw_json)

    try:
        response = supabase.table("user_profile").insert({
            "id": token_data["sub"],
            "json_format": encrypted_raw_json
        }).execute()
    except Exception as e:
        print("Error saving 'encrypted_raw_json' to 'json_format':", e)
        return {"status": "error", "detail": str(e)}
    
    """
    Converts the raw JSON data to a prompt format, encrypts the prompt format and saves it to the 'prompt_format' column.
    """
    prompt = Conversions().convert_profile_to_prompt(raw_json)
    encrypted_prompt = encrypt_data(prompt)

    try:
        response = supabase.table("user_profile").update({
            "prompt_format": encrypted_prompt
        }).eq("id", token_data["sub"]).execute()
    except Exception as e:
        print("Error updating 'prompt_format' in 'user_profile':", e)
        return {"status": "error", "detail": str(e)}
    
    """
    Coverts the prompt format into a vector embedding, encrypts the vector embedding and saves it to the 'vector_embedding' column.
    """
    vector_embedding = Conversions().convert_prompt_to_vector(prompt)
    encrypted_vector_embedding = encrypt_data(vector_embedding.tolist())

    try:
        response = supabase.table("user_profile").update({
            "vector_embedding": encrypted_vector_embedding
        }).eq("id", token_data["sub"]).execute()
    except Exception as e:
        print("Error updating 'vector_embedding' in 'user_profile':", e)
        return {"status": "error", "detail": str(e)}

    data = await request.json()
    user_id = token_data["sub"]

    # You may need to expand on this
    encrypted_profile = {
        "id": user_id,
        "fullName": encrypt_data(json.dumps(data.get("fullName", ""))),
        "email": encrypt_data(json.dumps(data.get("email", ""))),
        "phone": encrypt_data(json.dumps(data.get("phone", ""))),
        "city": encrypt_data(json.dumps(data.get("city", ""))),
        "province": encrypt_data(json.dumps(data.get("province", ""))),
        "postalCode": encrypt_data(json.dumps(data.get("postalCode", ""))),
        "address": encrypt_data(json.dumps(data.get("address", ""))),

        # Serialize arrays/objects as JSON before encryption
        "skills": encrypt_data(json.dumps(data.get("skills", []))),
        "languages": encrypt_data(json.dumps(data.get("languages", []))),
        "education": encrypt_data(json.dumps(data.get("education", []))),
        "workExperience": encrypt_data(json.dumps(data.get("workExperience", []))),
    }

    # Insert into Supabase
    response = supabase.table("profiles").insert(encrypted_profile).execute()

    if not response.data:
        print("Error saving profile:", response)
        return {"status": "error", "detail": str(response)}

    return {"status": "success"}
