# 🌾 Organic Shet Doctor AI - Setup & Running Guide

## परिचय (Introduction)

**ऑर्गेनिक शेती डॉक्टर** हा एक शेतकरी-अनुकूल वेब ऍप्लिकेशन आहे जो:
- फसलांच्या समस्या ओळखण्यात मदत करतो
- केवळ सेंद्रिय, देशी, प्राचीन उपाय देतो
- कोणतेही रसायन किंवा ब्रँड नाव नाही
- सोप्या मराठी भाषेत लिहिले आहे

---

## 📋 System Requirements

- **Windows 7/10/11** (या setup के लिए)
- **Python 3.9+** (installed and in PATH)
- **SQLite** (comes with Python)
- **Modern Browser** (Chrome, Firefox, Edge, Safari)

---

## ⚡ Quick Start (2 मिनिट)

### 1️⃣ Open Command Prompt / PowerShell
```powershell
cd E:\Farm_AI\OrganicShetDoctorAI
```

### 2️⃣ Run Startup Script
**Option A: PowerShell (Recommended)**
```powershell
.\start.ps1
```

**Option B: Manual (if script doesn't run)**
```powershell
python -m venv venv
.\venv\Scripts\pip install -r requirements.txt
.\venv\Scripts\python.exe run.py
```

### 3️⃣ Open in Browser
Go to: **http://localhost:8000/**

---

## 📁 Project Structure

```
OrganicShetDoctorAI/
│
├── backend/                    # FastAPI backend
│   ├── main.py                 # API endpoints
│   ├── database.py             # Database connection
│   ├── models.py               # Pydantic models
│   └── __init__.py
│
├── frontend/                   # HTML/CSS/JS
│   ├── index.html              # Main page (Marathi)
│   ├── styles.css              # Responsive design
│   ├── script.js               # Frontend logic
│   └── assets/                 # (future: images)
│
├── db/                         # Database
│   ├── schema.sql              # Database schema
│   └── organic_shet.db         # SQLite database (created)
│
├── venv/                       # Python virtual environment
├── run.py                      # Main application runner
├── start.ps1                   # Windows startup script
├── init_db.py                  # Database initialization
├── requirements.txt            # Python dependencies
└── README.md
```

---

## 🔧 Installation Steps (Detailed)

### Step 1: Create Virtual Environment
```bash
python -m venv venv
```

### Step 2: Activate Virtual Environment
**Windows (PowerShell):**
```powershell
.\venv\Scripts\Activate.ps1
```

**Windows (Command Prompt):**
```cmd
venv\Scripts\activate.bat
```

### Step 3: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 4: Initialize Database
```bash
python init_db.py
```

### Step 5: Run Application
```bash
python run.py
```

---

## 🌐 Accessing the Application

| URL | Purpose |
|-----|---------|
| **http://localhost:8000/** | Main frontend (Marathi UI) |
| **http://localhost:8000/docs** | API documentation (Swagger) |
| **http://localhost:8000/redoc** | API docs (ReDoc format) |

---

## 📡 API Endpoints

### Get All Problems
```
GET /problems
```
Response:
```json
[
  {
    "problem_id": 1,
    "name": "पिवळसर पाने",
    "symptoms": "पानांची कडा पिवळी...",
    "cause": "उशिरा खत देणे..."
  }
]
```

### Get Solutions for a Problem
```
GET /problems/{problem_id}/solutions
```
Response:
```json
[
  {
    "solution_id": 1,
    "problem_id": 1,
    "solution_name": "नीम पाण्याचा फवारणी",
    "ingredients": "1 चमचा नीमपुरी...",
    "preparation": "नीमपुरी पाण्यात...",
    "dosage": "प्रत्येक ७ दिवसांनी...",
    "timing": "सकाळी किंवा संध्याकाळी...",
    "warning": null
  }
]
```

---

## 🧩 Adding More Problems & Solutions

### Edit Database Directly (Using Python)

```python
import sqlite3

conn = sqlite3.connect('db/organic_shet.db')
cursor = conn.cursor()

# Add a new problem
cursor.execute("""
    INSERT INTO problem (name, symptoms, cause)
    VALUES ('समस्या नाव', 'लक्षणे', 'कारण')
""")

# Add solution for that problem
cursor.execute("""
    INSERT INTO organic_solution 
    (problem_id, solution_name, ingredients, preparation, dosage, timing, warning)
    VALUES (1, 'उपाय नाव', 'घटक', 'तयारी', 'खुराक', 'वेळ', 'सावधानी')
""")

conn.commit()
conn.close()
```

Or use **http://localhost:8000/docs** to test creating data.

---

## 🐛 Troubleshooting

### Issue: "venv not found"
**Solution:**
```bash
python -m venv venv
```

### Issue: "python not found"
**Solution:**
- Download Python from https://www.python.org/downloads/
- During installation, check **"Add Python to PATH"**
- Restart Command Prompt

### Issue: "Port 8000 already in use"
**Solution:** Use different port:
```bash
python -m uvicorn backend.main:app --port 8001
```
Then visit: http://localhost:8001/

### Issue: "Database file not found"
**Solution:**
```bash
python init_db.py
```

### Issue: Browser shows "Cannot connect"
**Solution:**
1. Server must be running (keep terminal open)
2. Check terminal for error messages
3. Make sure URL is exactly: http://localhost:8000/

---

## 🎯 How to Use the Application

### For Farmers (किसान)

1. **Home Page** - दिसेल शीर्षक: "ऑर्गेनिक शेती डॉक्टर"
2. **Disclaimer** - वाचा: "हे पारंपरिक सेंद्रिय शेती मार्गदर्शन आहे"
3. **Select Problem** - dropdown मधून समस्या निवडा
4. **View Solution** - "उपाय पहा" बटण दाबा
5. **Follow Steps** - दिलेल्या चरणांनुसार घरी उपाय करा

### For Developers (प्रोग्रामर)

- Frontend: `frontend/index.html`, `script.js`, `styles.css`
- Backend: `backend/main.py` (FastAPI endpoints)
- Database: `db/organic_shet.db` (SQLite)
- Add new features in `backend/` and call from `frontend/`

---

## 📚 Technology Stack

| Layer | Technology | Details |
|-------|-----------|---------|
| **Frontend** | HTML5 + CSS3 + JavaScript | Mobile-first design |
| **Backend** | Python FastAPI | RESTful API |
| **Database** | SQLite | Lightweight, file-based |
| **Server** | Uvicorn | ASGI server |
| **Validation** | Pydantic | Data validation |

---

## 🔒 Security & Compliance

- ✅ **No personal data collected** (offline-first design)
- ✅ **No internet required** (runs locally)
- ✅ **Open source** (check code anytime)
- ✅ **CORS enabled** (can be paired with mobile app)
- ✅ **Database encrypted option** (SQLite supports encryption)

---

## 📝 Sample Data (Currently in Database)

### Problem 1: पिवळसर पाने (Yellow Leaves)
- **Symptoms:** पानांची कडा पिवळी आणि काळवट होत आहे
- **Cause:** उशिरा खत देणे किंवा पाणी साचणे
- **Solution:** नीम पाण्याचा फवारणी (Neem spray)

### Problem 2: कोणपुर रोग (Root Rot)
- **Symptoms:** नदीगे अंधारती होतात आणि मुख्य फांदी द्रवू होते
- **Cause:** मातीतील पाण्याचा तुटवडा किंवा वादळाची हानी
- **Solution:** कोथिंबीर व तुळशीचा अर्क (Coriander & tulsi extract)

---

## 🚀 Future Features (To Be Added)

- 📷 Image recognition for leaf diseases
- 🗣️ Voice input in Marathi
- 📱 Mobile app (React Native)
- 🌍 Multi-language support
- 📊 Crop calendar & seasonal tips
- 👨‍🌾 Farmer community forum
- 📈 Analytics & tracking

---

## 💬 Language Used

- **Frontend UI:** मराठी (Marathi) - सोप्या शब्दांत
- **Code Comments:** English + Marathi
- **Database:** UTF-8 (supports Marathi text)

---

## 📞 Support

If you face issues:
1. Check **Troubleshooting** section above
2. Look at terminal error messages
3. Verify all files exist in project folder
4. Try starting fresh:
   ```bash
   rd /s venv
   python -m venv venv
   pip install -r requirements.txt
   python run.py
   ```

---

## ✨ Key Rules (Always Remember)

| Rule | Status | Details |
|------|--------|---------|
| ❌ NO Chemical Pesticides | **STRICT** | Only organic ingredients |
| ❌ NO Brand Names | **STRICT** | No product marketing |
| ✅ ONLY Home/Farm Ingredients | **REQUIRED** | Neem, garlic, chili, etc. |
| ✅ Simple Marathi Language | **REQUIRED** | Not scientific terms |
| ✅ Traditional Knowledge | **REQUIRED** | Ayurveda + old farming methods |

---

**🌱 Happy Organic Farming!**

*"हे पारंपरिक सेंद्रिय शेती मार्गदर्शन आहे. स्थानिक परिस्थितीनुसार वापर करा."*

---

Last Updated: March 1, 2026  
Version: 1.0 (Beta)
