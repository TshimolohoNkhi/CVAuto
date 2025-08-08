# add functionality to convert to json file
# create embedded_vector column in each table
# generate vector embeddings
# store in Supabase
# add job + candidate matching functionality
import json

def convert_to_json(data):
    try:
        json_data = json.dumps(data, indent=4)
        return json_data
    except (TypeError, ValueError) as e:
        raise ValueError(f"Error converting to JSON: {e}")