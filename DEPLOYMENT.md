# 🌾 Deployment & Customization Guide

## Adding More Problems and Solutions

### Method 1: Using Python Script

Create a file `add_data.py`:

```python
import sqlite3
from pathlib import Path

DB_PATH = Path("db/organic_shet.db")

conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()

# Example: Add a new crop problem
problems = [
    ("शंकर रोग (Powdery Mildew)", 
     "पानांवर पांढरा पावडर दिसतो, पान कुरळते",
     "उच्च आर्द्रता आणि उष्ण मोसम"),
    
    ("पांढरी फुांदी (White Fungus)",
     "तण्डुळांवर पांढरे धब्बे तयार होतात",
     "जास्त पाणी किंवा रोपेत घनता"),
    
    ("शेंगामधील कीटक",
     "शेंगा आणि दाणे खाण्यायोग्य नहीत",
     "वर्षेच्या शेवटी आर्द्रता"),
]

problem_ids = []
for name, symptoms, cause in problems:
    cursor.execute(
        "INSERT INTO problem (name, symptoms, cause) VALUES (?, ?, ?)",
        (name, symptoms, cause)
    )
    problem_ids.append(cursor.lastrowid)

# Add solutions for new problems
solutions = [
    # For problem 1: Powdery Mildew
    (problem_ids[0], 
     "दही + तुळशीचा फवारणी",
     "1 लीटर दही, 1 लीटर पाणी, मुठ्ठी तुळशीची पानं",
     "दही पाण्यात मिळवून तुळशी घालून २ तास ठेवा",
     "500 मिली दोन दिवसांत फवारणी",
     "संध्याकाळी करा जेणेकरून सूर्य थेट न लागेल",
     None),
    
    # For problem 2: White Fungus
    (problem_ids[1],
     "नीम + लसूण अर्क",
     "100 ग्रा नीमपुरी, 10 लसूण, 5 लीटर पाणी",
     "लसूण पेस्ट बनवा, नीमपुरी घालून रात्रभर भिजवा, सकाळी गाळा",
     "1 लीटर दिवसातून एकदा",
     "सकाळ ६-८ किंवा संध्या ४-६",
     "जेव्हा शेंगा ८० टक्के नव्हेत तर हे केवळ शेंगावर करा"),
     
    # For problem 3: Pest control
    (problem_ids[2],
     "मिरची + साबण फवारणी",
     "100 ग्रा सूक मिरची, 2 लीटर पाणी, 1 चमचा नारियेळ साबण",
     "सूक मिरची पाण्यात शिजवून २ तास ठेवा, गाळा, साबण घालून मिक्स करा",
     "500 मिली दिवसातून एकदा",
     "संध्याकाळी करा, साबण पाणीत चांगले विरघळते",
     "जेव्हा कीटक दिसू लागतात तेव्हा लगेच करा"),
]

for sol_data in solutions:
    cursor.execute(
        """INSERT INTO organic_solution 
           (problem_id, solution_name, ingredients, preparation, dosage, timing, warning)
           VALUES (?, ?, ?, ?, ?, ?, ?)""",
        sol_data
    )

conn.commit()
conn.close()
print("✅ Data added successfully!")
```

Run it:
```bash
python add_data.py
```

### Method 2: Direct Database Query

```python
import sqlite3

conn = sqlite3.connect('db/organic_shet.db')
cursor = conn.cursor()

# View all problems
cursor.execute("SELECT * FROM problem")
print("Problems:", cursor.fetchall())

# View all solutions
cursor.execute("SELECT * FROM organic_solution")
print("Solutions:", cursor.fetchall())

conn.close()
```

### Method 3: Using API (Swagger UI)

1. Go to: http://localhost:8000/docs
2. Click "Try it out" on `/problems` endpoint
3. Make POST requests to add data

---

## Database Schema Reference

### table: problem
```sql
CREATE TABLE problem (
    problem_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,                 -- समस्या का नाम (Marathi)
    symptoms TEXT NOT NULL,             -- लक्षणे (symptoms)
    cause TEXT NOT NULL                 -- कारण (cause)
);
```

### table: organic_solution
```sql
CREATE TABLE organic_solution (
    solution_id INTEGER PRIMARY KEY AUTOINCREMENT,
    problem_id INTEGER NOT NULL,        -- refers to problem.problem_id
    solution_name TEXT NOT NULL,        -- समाधान का नाम
    ingredients TEXT NOT NULL,          -- घटक (ingredients)
    preparation TEXT NOT NULL,          -- तैयारी (how to prepare)
    dosage TEXT NOT NULL,              -- खुराक (quantity to use)
    timing TEXT NOT NULL,              -- वेळ (when to apply)
    warning TEXT,                      -- सावधानी (precautions/warnings)
    FOREIGN KEY(problem_id) REFERENCES problem(problem_id) ON DELETE CASCADE
);
```

---

## Customizing the Frontend

### Change Colors (styles.css)

```css
/* Change primary color */
.big-button {
    background: #ff6b35;  /* Change from #4caf50 (green) to orange */
}

h1 {
    color: #d35400;  /* Change heading color */
}
```

### Change Language/Text

Edit `frontend/index.html`:
```html
<h1>आपली शेती डॉक्टर</h1>  <!-- Change title -->
<h2>समस्या निवडा</h2>        <!-- Change label -->
```

### Add New Buttons

```html
<button id="btnFeedback" class="big-button">तुमचा अभिप्राय पाठवा</button>
```

Then in `script.js`:
```javascript
document.getElementById('btnFeedback').addEventListener('click', () => {
    alert('आपल्या अभिप्रायासाठी धन्यवाद!');
});
```

---

## Customizing the Backend

### Add New API Endpoint

Edit `backend/main.py`:

```python
@app.get("/health")
def health_check():
    """Check if server is running"""
    return {"status": "healthy", "message": "Server is running"}

@app.post("/feedback")
def submit_feedback(feedback: str):
    """Save farmer feedback"""
    # Save to file or database
    with open("feedback.txt", "a") as f:
        f.write(feedback + "\n")
    return {"message": "Feedback received!"}
```

Test it: http://localhost:8000/docs

---

## Multi-Language Support

### Add English Support

Modify `backend/main.py`:

```python
TRANSLATIONS = {
    "mr": {
        "problem": "समस्या",
        "solution": "उपाय"
    },
    "en": {
        "problem": "Problem",
        "solution": "Solution"
    }
}

@app.get("/problems")
def list_problems(lang: str = "mr"):
    # Return problems in requested language
    pass
```

---

## Deploying to Production

### Option 1: Using Gunicorn (Linux/Mac)

```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:8000 backend.main:app
```

### Option 2: Using Python Anywhere (Cloud)

1. Upload files to PythonAnywhere
2. Configure web app with Flask/FastAPI
3. Set custom domain
4. Enable HTTPS

### Option 3: Docker (Professional)

Create `Dockerfile`:
```dockerfile
FROM python:3.11

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

CMD ["python", "run.py"]
```

Build and run:
```bash
docker build -t organic-shet-doctor .
docker run -p 8000:8000 organic-shet-doctor
```

---

## Performance Tips

### 1. Add Database Indexing
```python
cursor.execute("CREATE INDEX idx_problem_id ON organic_solution(problem_id)")
```

### 2. Cache API Responses
```python
from functools import lru_cache

@lru_cache(maxsize=100)
def get_problems():
    # Results will be cached
    pass
```

### 3. Optimize Database Queries
```python
# Good: Fetch only what you need
cursor.execute("SELECT problem_id, name FROM problem")

# Bad: Fetch everything then filter
cursor.execute("SELECT * FROM problem")
```

### 4. Compress Responses
```python
from fastapi.middleware.gzip import GZIPMiddleware
app.add_middleware(GZIPMiddleware, minimum_size=1000)
```

---

## Adding Image Support

### Step 1: Create Image Upload Directory
```bash
mkdir -p frontend/uploads
```

### Step 2: Update Backend

```python
from fastapi import File, UploadFile
import shutil

@app.post("/upload-leaf")
async def upload_leaf(file: UploadFile = File(...)):
    """Save uploaded leaf image"""
    file_path = f"frontend/uploads/{file.filename}"
    with open(file_path, "wb") as f:
        shutil.copyfileobj(file.file, f)
    return {"filename": file.filename, "path": f"/static/uploads/{file.filename}"}
```

### Step 3: Update Frontend

```javascript
document.getElementById('btnUpload').addEventListener('click', () => {
    document.getElementById('imageInput').click();
});

document.getElementById('imageInput').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const form = new FormData();
    form.append('file', file);
    
    const res = await fetch(`${apiBase}/upload-leaf`, {
        method: 'POST',
        body: form
    });
    
    const data = await res.json();
    console.log("Image uploaded:", data.path);
});
```

---

## Backup & Recovery

### Backup Database
```bash
copy db\organic_shet.db db\organic_shet_backup.db
```

### Restore Database
```bash
copy db\organic_shet_backup.db db\organic_shet.db
```

---

## Monitoring & Logging

Add logging to `backend/main.py`:
```python
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.get("/problems")
def list_problems():
    logger.info("Someone accessed problems endpoint")
    # ... rest of code
```

---

## Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Database locked | Concurrent access | Use `timeout=5` in connection |
| Slow API | Unindexed queries | Add database indexes |
| CORS error | Frontend/backend mismatch | Check `allow_origins` in main.py |
| 404 on static files | Wrong path | Check `mount("/static", ...)` path |
| Unicode issues | Encoding mismatch | Ensure UTF-8 everywhere |

---

## Version Control (Git)

```bash
git init
git add .
git commit -m "Initial Organic Shet Doctor AI"
git remote add origin https://github.com/yourusername/organic-shet-doctor.git
git push -u origin main
```

---

**Happy Customizing! 🌱**
