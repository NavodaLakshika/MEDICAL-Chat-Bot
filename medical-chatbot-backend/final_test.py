import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

try:
    model = genai.GenerativeModel("gemini-2.5-flash")
    response = model.generate_content("Say 'Gemini 2.5 is active'")
    
    with open("result.txt", "w", encoding="utf-8") as f:
        f.write(response.text)

except Exception as e:
    with open("result.txt", "w", encoding="utf-8") as f:
        f.write(f"ERROR: {str(e)}")
