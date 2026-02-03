import os
from dotenv import load_dotenv
from services.gemini_service import ask_gemini

load_dotenv()

print("Testing ask_gemini function...")
response = ask_gemini("What are common symptoms of a cold?")
print("Response:")
print(response)
