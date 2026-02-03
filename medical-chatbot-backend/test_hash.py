from utils.security import hash_password, verify_password

password = "password123"
hashed = hash_password(password)
print(f"Hashed: {hashed}")
verified = verify_password(password, hashed)
print(f"Verified: {verified}")

wrong_verified = verify_password("wrong", hashed)
print(f"Wrong verified: {wrong_verified}")
