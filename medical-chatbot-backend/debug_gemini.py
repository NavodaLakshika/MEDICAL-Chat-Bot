import os
import traceback
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

with open('gemini_debug.log', 'w') as log:
    try:
        api_key = os.getenv("GOOGLE_API_KEY", "").strip()
        log.write(f"Key preview: {api_key[:5]}...{api_key[-5:]}\n")
        
        if not api_key:
            log.write("ERROR: NO API KEY\n")
            exit()
            
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-1.5-flash')
        
        log.write("Sending request...\n")
        response = model.generate_content("Hi")
        log.write(f"Response: {response.text}\n")
    except Exception as e:
        log.write(f"CRITICAL ERROR: {str(e)}\n")
        log.write(traceback.format_exc())
