import os
from cryptography.fernet import Fernet

class Encryption:
    def __init__(self) -> None:
        # Generate once with: Fernet.generate_key()
        ENCRYPTION_KEY = os.getenv("ENCRYPTION_KEY")
        if ENCRYPTION_KEY is None:
            raise RuntimeError("ENCRYPTION_KEY environment variable is not set")

        fernet = Fernet(ENCRYPTION_KEY)

        return fernet

    def encrypt_data(plain_text: str, fernet) -> str:
        return fernet.encrypt(plain_text.encode()).decode()

    def decrypt_data(encrypted_text: str, fernet) -> str:
        return fernet.decrypt(encrypted_text.encode()).decode()

class Validation:
    def __init__(self):
        pass
    def validate_input():
        pass

    def validate_output():
        pass

class Middleware:
    def __init__(self):
        pass

    def rate_limiting():
        pass

    def CORS():
        pass

