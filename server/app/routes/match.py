# Pull vectors from db - done
# Decrypt vectors - done
# Call function to perform cosine similarity - done
# Return the results

from config.supabase_settings import supabase
from config.security import Encryption
from sentence_transformers import util
from utils.conversions import Conversions
from utils.similarity_reasoning import ExtractReasoning

supabase_client, SUPABASE_URL, SUPABASE_SERVICE_KEY = supabase()

decrypt_data = Encryption().decrypt_data

query_vector = Conversions().convert_profile_and_preferences
stored_vector = decrypt_data((supabase.table("jobs").select("vector_embedding").execute()))

user_profile_response = (supabase.table("user_profile").select("vector_embedding").execute())
user_preference_response = (supabase.table("user_preferences").select("vector_embedding").execute())

best_matches = []
# Use Supabase instead of a list to store the matches

stored_json = decrypt_data((supabase.table("jobs").select("json_format").eq("id", stored_vector['id']).execute()))
query_json = decrypt_data((supabase.table("user_profile").select("json_format").eq("id", user_profile_response['id']).execute()))

for user_profile in user_profile_response.data:
    decrypted_vector = decrypt_data(user_profile_response['vector_embedding'])
    sim = util.cos_sim(query_vector, stored_vector)

    if sim >= 0.8:
        best_matches.append((user_profile, sim.item()))
        
        try:
            response = supabase.table("matched").insert({
                "user_id": user_profile['id'],
                "job_id": stored_vector['id'],
                "match_score": sim.item(),
                "reasons": ExceptionGroup().generate_reasons(stored_json, query_json)
                # Generate reasons based on the match
            }).execute()
        except Exception as e:
            print("Error saving match to 'matches' table:", e)

        print(f"Match found with similarity {sim.item()}")
    else:
        continue
    