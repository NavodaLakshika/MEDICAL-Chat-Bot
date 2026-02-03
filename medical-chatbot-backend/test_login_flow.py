import requests

BASE_URL = "http://127.0.0.1:8001/api/auth"

def test_flow():
    email = "test@example.com"
    password = "password123"
    
    # Register
    reg_data = {"name": "Test User", "email": email, "password": password}
    resp = requests.post(f"{BASE_URL}/register", json=reg_data)
    print(f"Register status: {resp.status_code}")
    print(f"Register response: {resp.text}")
    
    # Login
    login_data = {"email": email, "password": password}
    resp = requests.post(f"{BASE_URL}/login", json=login_data)
    print(f"Login status: {resp.status_code}")
    print(f"Login response: {resp.text}")

if __name__ == "__main__":
    test_flow()
