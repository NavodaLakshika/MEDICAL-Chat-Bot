# services/openai_service.py
from openai import OpenAI
import os

# Make sure you set OPENAI_API_KEY in your environment
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def ask_gpt(message: str) -> str:
    """
    Sends user message to GPT and returns the response using the modern OpenAI client.
    """
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful medical assistant."},
                {"role": "user", "content": message}
            ],
            max_tokens=200
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        print(f"OpenAI Error: {e}")
        return f"I'm sorry, I'm having trouble processing that request right now. (Error: {str(e)})"
