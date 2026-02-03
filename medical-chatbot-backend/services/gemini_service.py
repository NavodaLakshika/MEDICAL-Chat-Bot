# services/gemini_service.py
import google.generativeai as genai
import os

# Configure the Gemini API
api_key = os.getenv("GOOGLE_API_KEY", "").strip()
if api_key:
    print(f"Configuring Gemini with API Key starting with: {api_key[:5]}")
    genai.configure(api_key=api_key)
else:
    print("WARNING: GOOGLE_API_KEY NOT FOUND")

def ask_gemini(message: str, history=None, custom_knowledge: str = "") -> str:
    """
    Sends user message to Google Gemini with history for persistent memory.
    history format: [{"role": "user", "parts": ["..."]}, {"role": "model", "parts": ["..."]}]
    """
    try:
        # Enhanced Medical-Only System Instruction
        training_instruction = (
            "You are MediBot AI, a specialized medical and healthcare assistant exclusively focused on health-related topics.\n\n"
            
            "🏥 YOUR CORE MISSION:\n"
            "- ONLY answer questions related to medicine, health, diseases, symptoms, treatments, medications, and wellness\n"
            "- Provide accurate, evidence-based medical information\n"
            "- Use clear, professional, yet empathetic language\n"
            "- Structure responses with proper formatting (bullet points, sections) for easy reading\n"
            "- Include relevant medical terminology with simple explanations\n\n"
            
            "❌ STRICT BOUNDARIES:\n"
            "- If asked about non-medical topics (sports, entertainment, general knowledge, etc.), politely decline and say:\n"
            "  'I am a specialized medical AI assistant. I can only help with health and medical questions. Please ask me about symptoms, conditions, treatments, or general health advice.'\n"
            "- Do NOT provide information outside the medical/health domain\n\n"
            
            "✅ RESPONSE GUIDELINES:\n"
            "1. Start with a brief, clear answer\n"
            "2. Provide detailed explanation with medical context\n"
            "3. Include relevant symptoms, causes, or treatment options\n"
            "4. Add preventive measures or lifestyle recommendations when applicable\n"
            "5. Use emojis sparingly for visual clarity (🩺 💊 🏥 ⚕️ 🔬)\n"
            "6. End with a professional medical disclaimer\n\n"
            
            "📋 FORMATTING STYLE:\n"
            "- Use **bold** for key medical terms\n"
            "- Use bullet points for lists\n"
            "- Use numbered steps for procedures\n"
            "- Keep paragraphs short and scannable\n\n"
        )
        
        if custom_knowledge:
            training_instruction += (
                "📚 SPECIALIZED KNOWLEDGE BASE:\n"
                "You have access to additional clinical data:\n"
                "--- START OF KNOWLEDGE BASE ---\n"
                f"{custom_knowledge}\n"
                "--- END OF KNOWLEDGE BASE ---\n"
                "Prioritize this specialized knowledge when relevant to the query.\n\n"
            )

        training_instruction += (
            "⚠️ MANDATORY DISCLAIMER:\n"
            "Always end your response with:\n"
            "'⚠️ **Medical Disclaimer**: I am an AI assistant providing general health information. "
            "For accurate diagnosis, treatment plans, or medical emergencies, please consult a qualified healthcare professional immediately.'\n\n"
            
            "Remember: Your responses should be informative, professional, visually organized, and strictly medical-focused."
        )

        if not os.getenv("GOOGLE_API_KEY"):
            return "Gemini API Key is missing. Please set it in the .env file."

        # Use gemini-2.5-flash (confirmed working model)
        model = genai.GenerativeModel(
            model_name='gemini-2.5-flash',
            system_instruction=training_instruction
        )
        
        # Initialize chat with history
        chat = model.start_chat(history=history or [])
        
        response = chat.send_message(message)
        return response.text.strip()
        
    except Exception as e:
        import traceback
        traceback.print_exc()
        error_str = str(e)
        print(f"Gemini Error: {error_str}")
        
        # Better error handling for quota issues
        if "429" in error_str or "quota" in error_str.lower() or "exceeded" in error_str.lower():
            return (
                "🚫 **Daily API Quota Exceeded**\n\n"
                "You've reached the free tier limit for gemini-2.5-flash (20 requests/day).\n\n"
                "**Quick Solutions:**\n\n"
                "1️⃣ **Wait**: Quota resets in 24 hours\n\n"
                "2️⃣ **New API Key**: Get one at https://aistudio.google.com/apikey\n"
                "   - Create new project\n"
                "   - Generate new key\n"
                "   - Update .env file\n\n"
                "3️⃣ **Upgrade**: Pay-as-you-go at https://ai.google.dev/pricing\n"
                "   - $0.075 per 1M characters\n"
                "   - Much higher limits\n\n"
                "⚠️ **Current Usage**: Check at https://ai.dev/rate-limit"
            )
        elif "API key" in error_str or "401" in error_str:
            return "❌ Invalid or missing API key. Please check your .env file."
        elif "404" in error_str or "not found" in error_str:
            return "❌ Model not available. Using gemini-2.5-flash. If this persists, check your API version."
        else:
            return f"❌ Connection error: {error_str[:200]}"
