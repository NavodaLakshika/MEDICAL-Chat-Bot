import sys
with open('gemini_test_out.txt', 'rb') as f:
    content = f.read()
    decoded = content.decode('utf-8', errors='ignore')
    print(decoded)
