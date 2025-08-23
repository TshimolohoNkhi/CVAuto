from utils.conversions import Utilities
import json

class ExtractReasoning:
    def __init__(self):
        pass

    def generate_reasons(self, reason: str, stored_json, query_json) -> str:
        """
        Pass prompts to LLM to generate reasoning for the match
        """
        prompt_template = Utilities().load_prompt("generate_reasoning_prompt")

        if "{STORED_JSON}" not in prompt_template or "{QUERY_JSON}" not in prompt_template:
            raise ValueError("Prompt template missing {STORED_JSON} or {QUERY_JSON} placeholder.")
        
        prompt_template.format(
            STORED_JSON=json.dumps(stored_json, indent=2) if not isinstance(stored_json, str) else stored_json,
            QUERY_JSON=json.dumps(query_json, indent=2) if not isinstance(query_json, str) else query_json
        )
        
        return prompt_template, reason
