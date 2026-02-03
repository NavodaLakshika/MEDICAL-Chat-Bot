from passlib.context import CryptContext
import hashlib

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def test():
    password = "password123"
    print(f"Original password: {password}")
    
    # 1. Direct hash (should work for short password)
    try:
        h1 = pwd_context.hash(password)
        print(f"Direct hash success: {h1[:10]}...")
    except Exception as e:
        print(f"Direct hash failed: {e}")

    # 2. SHA-256 Pre-hash
    sha_hash = hashlib.sha256(password.encode('utf-8')).hexdigest()
    print(f"SHA-256 hash ({len(sha_hash)} chars): {sha_hash}")
    
    try:
        h2 = pwd_context.hash(sha_hash)
        print(f"Pre-hash success: {h2[:10]}...")
    except Exception as e:
        print(f"Pre-hash failed: {e}")

if __name__ == "__main__":
    test()
