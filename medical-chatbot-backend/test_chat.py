import requests

BASE_URL = "http://127.0.0.1:8001/api/auth"
CHAT_URL = "http://127.0.0.1:8001/api/chat/send"

def test_chat():
    # 1. Register a new user
    import random
    import string
    random_str = ''.join(random.choices(string.ascii_letters + string.digits, k=10))
    user_email = f"user_{random_str}@example.com"
    user_data = {
        "name": "Chat Tester",
        "email": user_email,
        "password": "password123"
    }
    
    print(f"Testing with: {user_email}")
    
    reg_resp = requests.post(f"{BASE_URL}/register", json=user_data)
    if reg_resp.status_code != 200:
        print(f"Register Failed: {reg_resp.text}")
        return
        
    token = reg_resp.json().get("token")
    print(f"Token acquired. Sending chat...")
    
    # 2. Send chat
    chat_headers = {"Authorization": f"Bearer {token}"}
    chat_data = {"message": "Hello, how are you?"}
    
    chat_resp = requests.post(CHAT_URL, json=chat_data, headers=chat_headers)
    print(f"Chat status: {chat_resp.status_code}")
    print(f"Chat response: {chat_resp.text}")

if __name__ == "__main__":
    test_chat()
