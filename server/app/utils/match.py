from config.supabase_settings import supabase
from config.security import Encryption
from sentence_transformers import util
from utils.conversions import Conversions

# Initialises the supabase client
supabase_client, SUPABASE_URL, SUPABASE_SERVICE_KEY = supabase()

# Initialises the decryption functionality
decrypt_data = Encryption().decrypt_data

# This calls the function that combines and converts the profile and preferences to a vector
query_vector = Conversions().convert_profile_and_preferences

# This pulls the stored vector embedding version of the jobs from the table in the database and decrypts them
stored_vector = decrypt_data((supabase.table("jobs").select("vector_embedding").execute()))

# This pulls the stored vector embedding version of the user profile from the table in the database
user_profile_response = (supabase.table("user_profile").select("vector_embedding").execute())

# This pulls the stored vector embedding version of the user prefrences from the table in the database
user_preference_response = (supabase.table("user_preferences").select("vector_embedding").execute())

preference_job_matches = []
# You need to match the preferences to the job and then match the matched results to the profile

# Preferences
# why are we decrypting the json if we only need the vector for similarity?
preferences_stored_json = decrypt_data((supabase.table("jobs").select("json_format").eq("id", stored_vector['id']).execute()))
preferences_query_json = decrypt_data((supabase.table("user_prefrences").select("json_format").eq("id", user_preference_response['id']).execute()))

for user_preference in user_preference_response.data:
    decrypted_preference_vector = decrypt_data(user_preference['vector_embedding'])
    preference_sim = util.cos_sim(preferences_query_json, preferences_stored_json )

    if preference_sim >= 0.51:
        preference_job_matches.append((user_preference, preference_sim.item()))

stored_json = decrypt_data((supabase.table("jobs").select("json_format").eq("id", stored_vector['id']).execute()))
query_json = decrypt_data((supabase.table("user_profile").select("json_format").eq("id", user_profile_response['id']).execute()))

for user_profile in user_profile_response.data:
    decrypted_vector = decrypt_data(user_profile_response['vector_embedding'])
    sim = util.cos_sim(query_vector, stored_vector)

    if sim >= 0.8:
        try:
            response = supabase.table("matched").insert({
                "user_id": user_profile['id'],
                "job_id": stored_vector['id'],
                "match_score": sim.item()
            }).execute()
        except Exception as e:
            print("Error saving match to 'matches' table:", e)

        print(f"Match found with similarity {sim.item()}")
    else:
        continue
