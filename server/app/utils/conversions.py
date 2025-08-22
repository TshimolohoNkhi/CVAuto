from sentence_transformers import SentenceTransformer
import json

class Utilities:
    def __init__(self) -> None:
        pass

    def load_prompt(self, prompt_name: str) -> str:
        import os
        """
        Load prompts from prompts directory.
        """
        prompt_file_path = os.path.join(
            os.path.dirname(__file__), "prompts", f"{prompt_name}.txt"
        )
        if not os.path.exists(prompt_file_path):
            raise FileNotFoundError(f"Prompt file {prompt_file_path} does not exist.")
        with open(prompt_file_path, "r", encoding="utf-8") as file:
            return file.read()

class Conversions:
    def __init__(self) -> None:
        pass

    def convert_profile_to_prompt(self, data):
        """
        Convert the given data (JSON string or dict) to a prompt format.
        """
        if isinstance(data, str):
            user_data = json.loads(data)
        elif isinstance(data, dict):
            user_data = data
        else:
            raise TypeError("Data must be a JSON string or a Python dict")

        prompt_template = Utilities().load_prompt("convert_profile_to_prompt")

        if "{PROFILE_JSON}" not in prompt_template:
            raise ValueError("Prompt template missing {PROFILE_JSON} placeholder.")

        return prompt_template.format(PROFILE_JSON=json.dumps(user_data, indent=2))
    
    def convert_preferences_to_prompt(self, data):
        """
        Convert the given data (JSON string or dict) to a prompt format.
        """
        if isinstance(data, str):
            user_data = json.loads(data)
        elif isinstance(data, dict):
            user_data = data
        else:
            raise TypeError("Data must be a JSON string or a Python dict")

        prompt_template = Utilities().load_prompt("convert_preferences_to_prompt")

        if "{PREFERENCES_JSON}" not in prompt_template:
            raise ValueError("Prompt template missing {PREFERENCES_JSON} placeholder.")

        return prompt_template.format(PREFERENCES_JSON=json.dumps(user_data, indent=2))

    def convert_prompt_to_vector(self, data):
        """
        Convert the given data to a vector format.
        """
        if isinstance(data, str):
            prompt_data = data
        else:
            raise TypeError("Data must be a JSON string")

        model = SentenceTransformer("all-MiniLM-L6-v2")

        vector_embedding = model.encode(prompt_data, convert_to_numpy=True)
        print("Vector shape: ", vector_embedding.shape)

        return vector_embedding
    
    def convert_profile_and_preferences(self, profile_data, preferences_data):
        """
        Convert user profile and preferences to a combined prompt format.
        """
        profile_prompt = self.convert_profile_to_prompt(profile_data)
        preferences_prompt = self.convert_preferences_to_prompt(preferences_data)

        combined_prompt = f"This is the user: {profile_prompt}\n\n This is the user preference: {preferences_prompt}"

        """
        Convert the combined prompt to a vector format.
        """
        if isinstance(combined_prompt, str):
            prompt_data = combined_prompt
        else:
            raise TypeError("Data must be a JSON string")
        
        model = SentenceTransformer("all-MiniLM-L6-v2")

        vector_embedding = model.encode(prompt_data, convert_to_numpy=True)

        return vector_embedding

