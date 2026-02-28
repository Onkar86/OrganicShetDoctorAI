# 📖 Organic Shet Doctor AI - Complete Documentation

## 🎯 Project Mission

**Build a farmer-friendly web application that helps farmers identify crop problems and provides ONLY organic, traditional, and science-backed solutions using materials available on their farm or at home.**

---

## 🚫 STRICT RULES (Non-Negotiable)

### Rule 1: NO Chemical Pesticides
❌ **Never mention:**
- Malathion, DDT, Endosulfan, Carbofuran
- Synthetic fertilizers (Urea, DAP, NPK)
- Commercial fungicides or insecticides

✅ **Instead use:**
- Neem (नीम)
- Garlic (लसूण)
- Chili powder (मिरची पाउडर)
- Ash (राख)
- Cow urine (गोमूत्र)
- Cow dung (गोबर)

### Rule 2: NO Brand Names or Market Products
❌ **Never mention:**
- Bavistin, Ridomil, Profenofos, Imidacloprid
- Brand fertilizers (Jio Krishi, Monsanto products)
- Patented biological agents

✅ **Instead describe:**
- Generic processes: "नीम पुरी" not "नीम तेल (Brand X)"
- Home-made preparations: "घरी बनवलेला अर्क"
- Traditional knowledge: "दादा-दादीचे उपाय"

### Rule 3: ONLY Home/Farm Resources
✅ **Approved ingredients:**
- Neem leaves, Neem oil (नीम पानं, नीम तेल)
- Garlic (लसूण)
- Red chili (कडी मिरची)
- Buttermilk (छाछ)
- Cow urine (गोमूत्र - traditional practice)
- Cow dung (गोबर)
- Ash from burning organic waste (राख)
- Tulsi leaves (तुळशी पानं)
- Coriander (कोथिंबीर)
- Salt, soap water (मीठ, साबण पाणी)
- Mustard oil (मोहरी तेल)
- Jaggery (गुळ)
- Marigold (झेंडू)

❌ **NOT Approved:**
- Any synthetic chemical
- Any commercial product name
- Anything not naturally growing/available

### Rule 4: This is NOT Medical Advice
- Always add disclaimer in Marathi
- Never claim to cure human diseases
- Never recommend for internal consumption (unless proven traditional use)
- Always suggest consulting local agriculture experts

**Sample Disclaimer:**
```
हे पारंपरिक सेंद्रिय शेती मार्गदर्शन आहे.
स्थानिक परिस्थितीनुसार वापर करा.
खरे परिणाम शेतीची स्थिती, हवामान, व मातीवर अवलंबून आहेत.
संशय असल्यास स्थानिक कृषि विभाग किंवा शेती विज्ञान केंद्रास संपर्क करा.
```

### Rule 5: Language = Simple Marathi Only
✅ **Good:**
- "पानांची कडा पिवळी पडत आहे" (Clear farming language)
- "नीम पाण्याचा फवारणी करा" (Direct instruction)
- "सकाळ आणि संध्याकाळ" (Simple description)

❌ **Bad:**
- "क्लोरोफिल हास्य" (Scientific jargon)
- "Photosynthesis आंतर्गत" (Mix of English & Marathi)
- "Pathogenic microorganism control" (Not farmer-friendly)

---

## 🗄️ Database Design Rules

### Table: problem
```sql
CREATE TABLE problem (
    problem_id INTEGER PRIMARY KEY,
    name TEXT,              -- Problem name in Marathi
    symptoms TEXT,          -- Observable signs (farmer can see)
    cause TEXT              -- Why it happens (simple explanation)
);
```

**Example Entry:**
```
problem_id: 1
name: "पिवळसर पाने" (Yellow Leaves)
symptoms: "पानांची कडा पिवळी आणि काळवट होत आहे" 
           (Leaf edges turn yellow and brown)
cause: "उशिरा खत देणे किंवा पाणी साचणे" 
       (Late fertilizer or waterlogging)
```

### Table: organic_solution
```sql
CREATE TABLE organic_solution (
    solution_id INTEGER PRIMARY KEY,
    problem_id INTEGER,     -- Foreign key to problem
    solution_name TEXT,     -- Name of remedy (in Marathi)
    ingredients TEXT,       -- ONLY approved ingredients
    preparation TEXT,       -- Step-by-step HOW to make
    dosage TEXT,           -- HOW MUCH to use
    timing TEXT,           -- WHEN to apply
    warning TEXT           -- Precautions/side effects
);
```

**Example Entry:**
```
solution_id: 1
problem_id: 1
solution_name: "नीम पाण्याचा फवारणी" (Neem Water Spray)
ingredients: "1 चमचा नीमपुरी, 1 लिटर पाणी"
preparation: "नीमपुरी पाण्यात भिजवून १० तास ठेवा, गाळून घ्या"
dosage: "प्रत्येक ७ दिवसांनी फवारणी करा"
timing: "सकाळ ६-७ किंवा संध्या ५-६"
warning: "गरम दिवसात षटचक्रीवरून करू नका, डोळ्यांत न घालता"
```

---

## 🧠 AI Usage Guidelines

### CORRECT: AI as Explainer
```
AI Task: 
- Take problems from DATABASE
- Take solutions from DATABASE
- Explain them in simpler/more detailed Marathi
- Answer farmer questions based on existing data
```

**Example Prompt:**
```
तुम्ही एक कृषी सहाय्यक आहात. मी तुम्हाला एक संस्कृत समस्या देत आहे:
समस्या: लगड मोहर, लक्षणे: पानांचे डोकेतून लाल तणतणीत धब्बे
मीठवे एकटे तरतव शब्दांत मराठीत २-३ वाक्यात स्पष्ट करा.
```

### WRONG: AI Inventing Solutions
❌ **Never ask AI to:**
- Create new remedies not in database
- Invent ingredients not traditionally used
- Suggest untested combinations
- Recommend chemical alternatives
- Make medical claims

❌ **Bad Prompt:**
```
"Give me any remedy for yellowing leaves using AI-generated solutions"
```

### CORRECT Safe AI Prompt
```
आपण एक मराठी शेती सहाय्यक आहात, माझे ज्ञान फक्त तयार डेटाबेसवर आधारित आहे.

जेव्हा मला एक समस्या सांगितली जाते:
1. मी DATABASE मध्ये तो शोधतो
2. DATABASE मधील उपाय व घटक वापरून स्पष्टीकरण देतो
3. माझे स्वतःचे नवीन उपाय कधीही सुचवत नाही
4. सर्व उपाय केवळ: नीम, लसूण, मिरची, गोबर, राख, तुळशी आणि 
   इतर घरी/शेतात उपलब्ध गोष्टींपर्यंत सीमित आहेत
5. मी कधीही रसायन, ब्रँड किंवा बाजारातली गोष्टी सुचवत नाही

आता मला खालील समस्या सोडवा:
[समस्या येथे]

स्पष्टीकरण द्या सरळ, निरागस, शेतकरी-अनुकूल भाषेत.
```

---

## 📝 Code Commenting Standards

### Python Comments (उदाहरण)
```python
# Database connection
# डेटाबेसशी कनेक्शन स्थापित करते
def get_connection():
    """Return SQLite connection to organic farming database"""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

# Get all crop problems - सर्व फसलांच्या समस्या मिळवा
@app.get("/problems")
def list_problems():
    """Fetch all problems from database - डेटाबेसपासून सर्व समस्या वाचा"""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM problem")
    rows = cursor.fetchall()
    conn.close()
    return [Problem(**dict(row)) for row in rows]
```

### HTML Comments (उदाहरण)
```html
<!-- Header - शीर्षलेख -->
<h1>ऑर्गेनिक शेती डॉक्टर</h1>

<!-- Disclaimer in Marathi - मराठीतील अस्वीकरण -->
<p class="disclaimer">
    हे पारंपरिक सेंद्रिय शेती मार्गदर्शन आहे.
</p>
```

### JavaScript Comments (उदाहरण)
```javascript
// Load all problems into dropdown menu
// लगडींचे नाव dropdown मध्ये लोड करा
async function loadProblems() {
    const res = await fetch(`${apiBase}/problems`);
    const problems = await res.json();
    // ... populate dropdown
}
```

---

## 🔒 Data Validation Rules

### For Problem Names
- ✅ Marathi only
- ✅ 5-100 characters
- ❌ No special symbols
- ❌ No English terms

### For Ingredients
- ✅ Only approved items (matching whitelist)
- ✅ Simple quantity descriptions
- ❌ No chemical names
- ❌ No percentages/scientific notation

### For Instructions
- ✅ Step-by-step clarity
- ✅ Specific timings (morning/evening)
- ✅ Quantity units (handful, spoonful, liter)
- ❌ No vague terms
- ❌ No commercial references

---

## 🧪 Testing Checklist

### Functionality Tests
- [ ] All problems load in dropdown
- [ ] Solutions display after selecting problem
- [ ] Database queries work correctly
- [ ] Frontend displays Marathi text correctly
- [ ] Disclaimer visible on page

### Content Tests
- [ ] No chemical names in database
- [ ] No brand names mentioned
- [ ] All ingredients are approved
- [ ] All text is in Marathi
- [ ] All quantities make sense

### Security Tests
- [ ] SQL injection prevented (use parameterized queries)
- [ ] No sensitive data in frontend code
- [ ] CORS properly configured
- [ ] File uploads validated (if enabled)

### User Experience Tests
- [ ] Buttons are big enough (mobile-friendly)
- [ ] Text is readable (font size)
- [ ] Navigation is obvious
- [ ] Loading times acceptable
- [ ] Works on mobile browsers

---

## 📊 Sample Data Collections

### Vegetable Crop Problems

| Crop | Problem | Solution |
|------|---------|----------|
| Tomato | पिवळसर पाने | नीम फवारणी |
| Onion | गोड भाज | दही + तुळशी अर्क |
| Cabbage | शेंगामधील कीटक | मिरची + साबण पाणी |
| Spinach | पांधरी ढेपली | लसूण अर्क |
| Carrot | मूळांचे सडन | गोबर/नीम अर्क |

### Grain Crop Problems

| Crop | Problem | Solution |
|------|---------|----------|
| Rice | शेंगा भाज | नीम तेल फवारणी |
| Wheat | पत्र भाज | तुळशी + नीम मिश्रण |
| Corn | जिंक कमतरता | गोगुल/खाद पूरक |
| Pulses | फूल तुटणे | कोथिंबीर अर्क |

### Perennial Crop Problems

| Crop | Problem | Solution |
|------|---------|----------|
| Mango | अँथ्राकनोज | नीम + राख मिश्रण |
| Sugarcane | लाल सड़न | गोबर + लसूण अर्क |
| Coconut | पत्र धब्बे | तुळशी अर्क |

---

## 📚 Resources & References

### Traditional Organic Farming (Marathi)
- "दादा भाई के सेंद्रिय खेती" (Organic farming traditions)
- Local agriculture department guidelines
- Farmer cooperative societies

### Database Quality Standards
- Each solution must have 5+ years traditional use
- Ingredient safety must be documented
- Farmer testimonies preferred
- No experimental/untested methods

### Legal Compliance
- Not claiming to cure diseases
- Disclaimer visible to all users
- No false advertising
- No liability for crop failure (natural variations)

---

## 🔄 Workflow for Adding New Data

1. **Research Phase**
   - Identify common problem in region
   - Document symptoms farmers observe
   - Find root cause

2. **Solution Research**
   - Look for traditional organic solutions
   - Verify ingredients are farm-available
   - Document preparation method
   - Test with local farmers (optional)

3. **Database Entry**
   - Add to `problem` table
   - Add 1-3 solutions to `organic_solution` table
   - Validate Marathi spelling
   - Check for chemical/brand names

4. **Quality Check**
   - No chemical pesticides mentioned?
   - No brand names?
   - All ingredients approved?
   - Language is simple Marathi?

5. **Deployment**
   - Database updated
   - Frontend tested
   - API endpoints verified
   - Disclaimer visible

---

## 🎓 Learning Resources for Beginners

### For Understanding Organic Farming
- Neem: Versatile, natural pesticide
- Garlic: Repellant for insects
- Ash: Soil amendment & pest control
- Cow products: Nutrient-rich, traditionally used

### For Understanding the Code
- FastAPI basics (Python web framework)
- SQLite (lightweight database)
- HTML/CSS/JavaScript (frontend)
- RESTful API design

### For Understanding the Business Logic
- Farmer needs simple solutions
- No time for experiments
- Trust in traditional methods
- Cost-effective farming

---

## ✅ Final Checklist Before Deployment

- [ ] Database initialized with sample data
- [ ] Backend API running without errors
- [ ] Frontend loads correctly
- [ ] Marathi text displays properly
- [ ] No chemical/brand name references
- [ ] Disclaimer visible and clear
- [ ] All buttons functional
- [ ] Mobile-friendly design works
- [ ] API endpoints return correct data
- [ ] Static files (HTML/CSS/JS) served properly

---

## 📞 Support Contacts

For organic farming questions:
- Local Agriculture Department
- Krishi Vigyan Kendra (KVK)
- Farmer Cooperative Societies
- Agricultural University Extension Services

---

**Remember: We are helping farmers, not selling products. Keep it simple, honest, and organic.** 🌱

Last Updated: March 1, 2026
