# 🔑 HOW TO GET A NEW GEMINI API KEY

## Step-by-Step Instructions:

### 1️⃣ Open Google AI Studio
**Click this link:** https://aistudio.google.com/apikey

(Opens in your browser)

---

### 2️⃣ Sign In
- Use your Google account
- If not signed in, click "Sign in" button

---

### 3️⃣ Create API Key

You'll see a button that says **"Create API Key"** or **"Get API Key"**

Click it, then you'll see options:

**Option A:** "Create API key in new project" ← **CLICK THIS ONE**
**Option B:** "Create API key in existing project"

**Choose Option A** (new project) to get a fresh quota!

---

### 4️⃣ Copy Your New Key

After clicking, you'll see something like:
```
AIzaSyD-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Click the COPY button** (📋 icon) next to the key

---

### 5️⃣ Update Your .env File

You already have the `.env` file open!

**Replace the old key with your new key:**

```env
GOOGLE_API_KEY=AIzaSyD-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

(Paste your actual new key there)

---

### 6️⃣ Save the File

Press **Ctrl + S** to save

---

### 7️⃣ Backend Will Auto-Reload

Your backend is running with `--reload` flag, so it will automatically pick up the new key!

---

## ✅ DONE!

Now test your chatbot - you'll have 20 fresh requests! 🎉

---

## 🎯 Quick Checklist:

- [ ] Go to https://aistudio.google.com/apikey
- [ ] Sign in with Google
- [ ] Click "Create API Key" → "Create API key in new project"
- [ ] Copy the new key
- [ ] Paste it in .env file (replacing old key)
- [ ] Save the file (Ctrl + S)
- [ ] Test chatbot!

---

**Need help?** Let me know which step you're on!
