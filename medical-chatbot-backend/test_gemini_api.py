import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

api_key = os.getenv("GOOGLE_API_KEY")
print(f"Using API Key: {api_key[:5]}...{api_key[-5:] if api_key else 'None'}")

if not api_key:
    print("Error: GOOGLE_API_KEY not found in .env file.")
else:
    try:
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_content("Hello! Can you confirm if you are working?")
        print("Gemini Response:")
        print(response.text)
    except Exception as e:
        print(f"Error connecting to Gemini: {e}")
