import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

api_key = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=api_key)

print("=" * 60)
print("Available Gemini Models for generateContent:")
print("=" * 60)

try:
    models = []
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            models.append(m.name)
    
    for model in sorted(models):
        print(f"✅ {model}")
    
    print("\n" + "=" * 60)
    print(f"Total: {len(models)} models available")
    print("=" * 60)
except Exception as e:
    print(f"❌ Error listing models: {e}")
