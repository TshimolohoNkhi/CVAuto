from cryptography.fernet import Fernet
import os

# Generate once with: Fernet.generate_key()
ENCRYPTION_KEY = os.getenv("ENCRYPTION_KEY")
if ENCRYPTION_KEY is None:
    raise RuntimeError("ENCRYPTION_KEY environment variable is not set")

fernet = Fernet(ENCRYPTION_KEY)

def encrypt_data(plain_text: str) -> str:
    return fernet.encrypt(plain_text.encode()).decode()

def decrypt_data(encrypted_text: str) -> str:
    return fernet.decrypt(encrypted_text.encode()).decode()
