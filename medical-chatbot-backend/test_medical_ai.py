import requests
import json

# Login first
login_url = "http://localhost:8000/api/auth/login"
login_data = {
    "email": "debug@example.com",
    "password": "password123"
}

print("🔐 Logging in...")
login_response = requests.post(login_url, json=login_data)
token = login_response.json().get("token")

# Test medical-focused responses
chat_url = "http://localhost:8000/api/chat/send"
headers = {
    "Authorization": f"Bearer {token}",
    "Content-Type": "application/json"
}

print("\n" + "="*60)
print("Testing Medical AI - Enhanced Responses")
print("="*60)

# Test 1: Medical Question
print("\n📋 TEST 1: Medical Question")
print("-" * 60)
response = requests.post(chat_url, json={"message": "What are the symptoms of diabetes?"}, headers=headers)
print("Question: What are the symptoms of diabetes?")
print("\nAI Response:")
print(response.json()["response"])

# Test 2: Non-Medical Question (should be rejected)
print("\n" + "="*60)
print("\n🚫 TEST 2: Non-Medical Question (Should be Rejected)")
print("-" * 60)
response = requests.post(chat_url, json={"message": "Who won the world cup?"}, headers=headers)
print("Question: Who won the world cup?")
print("\nAI Response:")
print(response.json()["response"])

# Test 3: Treatment Question
print("\n" + "="*60)
print("\n💊 TEST 3: Treatment Question")
print("-" * 60)
response = requests.post(chat_url, json={"message": "How to treat a common cold?"}, headers=headers)
print("Question: How to treat a common cold?")
print("\nAI Response:")
print(response.json()["response"])

print("\n" + "="*60)
print("✅ Testing Complete!")
print("="*60)
