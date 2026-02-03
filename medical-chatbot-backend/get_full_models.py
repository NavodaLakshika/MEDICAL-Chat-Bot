import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

with open('full_model_info.txt', 'w') as f:
    try:
        models = genai.list_models()
        for m in models:
            f.write(f"Name: {m.name}\n")
            f.write(f"Display Name: {m.display_name}\n")
            f.write(f"Description: {m.description}\n")
            f.write(f"Methods: {m.supported_generation_methods}\n")
            f.write("-" * 20 + "\n")
    except Exception as e:
        f.write(f"ERROR: {str(e)}")
