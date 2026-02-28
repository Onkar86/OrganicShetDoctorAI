// ========================================
// ORGANIC SHET DOCTOR AI - Frontend Script
// शेतकरी-मैत्रीपूर्ण शेती समाधान
// ========================================

const apiBase = 'http://127.0.0.1:8000';

// ====================
// समस्या लोड करा
// Load all problems from API and populate dropdown
// ====================
async function loadProblems() {
  const select = document.getElementById('problemSelect');
  
  try {
    // API ला कॉल करा आणि सर्व समस्या घ्या
    const response = await fetch(`${apiBase}/problems`);
    
    if (!response.ok) {
      throw new Error('समस्या लोड करू शकलो नाही');
    }
    
    const problems = await response.json();
    
    // समस्या क्रमवारीने सॉर्ट करा (Marathi alphabetical order)
    problems.sort((a, b) => a.name.localeCompare(b.name, 'mr'));
    
    // ड्रॉपडाउन मध्ये सर्व समस्या जोडा
    problems.forEach(problem => {
      const option = document.createElement('option');
      option.value = problem.problem_id;
      option.textContent = `🌾 ${problem.name}`;
      select.appendChild(option);
    });
    
  } catch (error) {
    // त्रुटी संदेश दर्शवा
    console.error('Error loading problems:', error);
    showError('समस्या लोड करताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा.');
  }
}

// ====================
// उपाय दाखवा
// Fetch and display solutions for selected problem
// ====================
async function showSolution() {
  const select = document.getElementById('problemSelect');
  const resultDiv = document.getElementById('result');
  const selectedValue = select.value;
  
  // जर कोणी समस्या निवडली नाही
  if (!selectedValue) {
    showError('कृपया पहिले एक समस्या निवडा');
    return;
  }
  
  try {
    // "उपाय दर्शवत आहे..." दाखवा
    resultDiv.innerHTML = '<div class="loading">⏳ उपाय शोधत आहे...</div>';
    
    // API ला कॉल करा आणि उपाय घ्या
    const response = await fetch(`${apiBase}/problems/${selectedValue}/solutions`);
    
    if (!response.ok) {
      throw new Error('उपाय लोड करू शकलो नाही');
    }
    
    const data = await response.json();
    const problem = data.problem;
    const solutions = data.solutions;
    
    if (!solutions || solutions.length === 0) {
      resultDiv.innerHTML = '<div class="error-message">⚠️ या समस्येचा कोणी उपाय मिळाला नाही.</div>';
      return;
    }
    
    // HTML तयार करा सर्व उपायांसह
    let html = `<div class="solution-card">
      <h2 class="problem-title">🌾 ${problem.name}</h2>
      <p style="color: #666; margin: 0.5rem 0; font-style: italic;">समस्या: ${problem.symptoms}</p>
    </div>`;
    
    // प्रत्येक उपाय दाखवा
    solutions.forEach((solution, index) => {
      html += `
        <div class="solution-card">
          <h3 class="solution-title">उपाय ${index + 1}: ${solution.solution_name}</h3>
          
          <div class="solution-item">
            <label>📋 साहित्य (Ingredients):</label>
            <p class="solution-item-text">${solution.ingredients}</p>
          </div>
          
          <div class="solution-item">
            <label>🔧 कृती (Preparation):</label>
            <p class="solution-item-text">${solution.preparation}</p>
          </div>
          
          <div class="solution-item">
            <label>📊 खुराक (Dosage):</label>
            <p class="solution-item-text">${solution.dosage}</p>
          </div>
          
          <div class="solution-item">
            <label>⏰ वेळ (Timing):</label>
            <p class="solution-item-text">${solution.timing}</p>
          </div>
      `;
      
      // जर कोणी चेतावणी असेल तर दाखवा
      if (solution.warning && solution.warning.trim()) {
        html += `
          <div class="warning-box">
            <strong>⚠️ महत्वाची सावधानी:</strong>
            <p style="margin: 0.5rem 0 0 0;">${solution.warning}</p>
          </div>
        `;
      }
      
      html += `</div>`;
    });
    
    resultDiv.innerHTML = html;
    
  } catch (error) {
    // त्रुटी संदेश दर्शवा
    console.error('Error loading solutions:', error);
    showError('उपाय लोड करताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा.');
  }
}

// ====================
// त्रुटी संदेश दाखवा
// Display error message to user
// ====================
function showError(message) {
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `<div class="error-message">❌ ${message}</div>`;
}

// ====================
// मराठी आवाज
// Marathi Text-to-Speech Function
// ====================
function speakText(text) {
  if (!("speechSynthesis" in window)) {
    alert("⚠️ तुमच्या ब्राउझरमध्ये आवाज सुविधा उपलब्ध नाही.");
    return;
  }
  
  // पूर्वीचा आवाज रद्द करा
  window.speechSynthesis.cancel();
  
  // नवीन उच्चारण तयार करा
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "mr-IN"; // मराठी भाषा
  utter.rate = 0.85;    // हळू, स्पष्ट वाचन
  utter.pitch = 1.0;    // सामान्य पिच
  utter.volume = 1.0;   // पूर्ण आवाज
  
  window.speechSynthesis.speak(utter);
  console.log("🔊 आवाज सुरू...");
}

// ====================
// पृष्ठ लोड होणे
// Initialize when page loads
// ====================
document.addEventListener('DOMContentLoaded', function() {
  // समस्या लोड करा
  loadProblems();
  
  // बटण दाबल्यावर उपाय दाखवा
  document.getElementById('btnSearch').addEventListener('click', showSolution);
  
  // आवाज बटण दाबल्यावर
  document.getElementById('btnSpeak').addEventListener('click', function() {
    const resultDiv = document.getElementById('result');
    const text = resultDiv.innerText;
    
    if (!text.trim() || text.includes('❌') || text.includes('⏳')) {
      alert("⚠️ पहिले 'उपाय दाखवा' क्लिक करून उपाय हरवा.");
      return;
    }
    
    speakText(text);
  });
  
  // Enter की दाबल्यावर देखील उपाय दाखवा
  document.getElementById('problemSelect').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      showSolution();
    }
  });
  
  // माहिती मोडल हँडलिंग (Info Modal)
  const infoBtn = document.getElementById('infoBtn');
  const infoModal = document.getElementById('infoModal');
  const closeModal = document.getElementById('closeModal');
  const closeBtn2 = document.getElementById('closeBtn2');
  
  // Info बटण क्लिक
  infoBtn.addEventListener('click', function() {
    infoModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // पार्श्वभूमी स्क्रोल रोक
  });
  
  // Close बटण क्लिक (X)
  closeModal.addEventListener('click', function() {
    infoModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  });
  
  // Close बटण क्लिक (बरोबर समजलं)
  closeBtn2.addEventListener('click', function() {
    infoModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  });
  
  // मोडल बाहेर क्लिक करल्यावर बंद करा
  infoModal.addEventListener('click', function(event) {
    if (event.target === infoModal) {
      infoModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
  
  // Escape की दाबल्यावर मोडल बंद करा
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && infoModal.classList.contains('active')) {
      infoModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
});
