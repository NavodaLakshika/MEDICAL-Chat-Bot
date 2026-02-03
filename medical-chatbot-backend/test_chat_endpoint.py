import requests
import json

# First, login to get token
login_url = "http://localhost:8000/api/auth/login"
login_data = {
    "email": "debug@example.com",
    "password": "password123"
}

print("Testing login...")
login_response = requests.post(login_url, json=login_data)
print(f"Login Status: {login_response.status_code}")
print(f"Login Response: {login_response.json()}")

if login_response.status_code == 200:
    token = login_response.json().get("token")
    print(f"\nToken obtained: {token[:20]}...")
    
    # Now test chat endpoint
    chat_url = "http://localhost:8000/api/chat/send"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    chat_data = {
        "message": "Hello, what are the symptoms of flu?"
    }
    
    print("\nTesting chat endpoint...")
    chat_response = requests.post(chat_url, json=chat_data, headers=headers)
    print(f"Chat Status: {chat_response.status_code}")
    print(f"Chat Response: {json.dumps(chat_response.json(), indent=2)}")
else:
    print("Login failed, cannot test chat endpoint")
