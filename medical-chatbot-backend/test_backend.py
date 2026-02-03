import requests
import random
import string

BASE_URL = "http://localhost:8001/api/auth"

def generate_random_string(length=10):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

def test_api():
    # 1. Register
    username = f"user_{generate_random_string()}"
    email = f"{username}@example.com"
    password = "password123"
    
    print(f"Testing with: {email} / {password}")

    register_payload = {
        "name": username,
        "email": email,
        "password": password
    }

    try:
        print("1. Sending Register Request...")
        reg_res = requests.post(f"{BASE_URL}/register", json=register_payload)
        print(f"   Status: {reg_res.status_code}")
        print(f"   Response: {reg_res.text}")
        
        if reg_res.status_code != 200:
            print("   [FAILED] Registration failed.")
            return

        # 2. Login
        print("\n2. Sending Login Request...")
        login_payload = {
            "email": email,
            "password": password
        }
        
        login_res = requests.post(f"{BASE_URL}/login", json=login_payload)
        print(f"   Status: {login_res.status_code}")
        print(f"   Response: {login_res.text}")

        if login_res.status_code == 200:
            print("\n   [SUCCESS] Backend is working correctly!")
        else:
            print("\n   [FAILED] Login failed.")

    except Exception as e:
        print(f"\n[ERROR] Connection failed: {e}")

if __name__ == "__main__":
    test_api()
