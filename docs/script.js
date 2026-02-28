// Copy of frontend/script.js adjusted for GitHub Pages (docs/)
const apiBase = 'http://127.0.0.1:8000';

async function loadProblems() {
  const select = document.getElementById('problemSelect');
  try {
    const response = await fetch(`${apiBase}/problems`);
    if (!response.ok) throw new Error('समस्या लोड करू शकलो नाही');
    const problems = await response.json();
    problems.sort((a, b) => a.name.localeCompare(b.name, 'mr'));
    problems.forEach(problem => {
      const option = document.createElement('option');
      option.value = problem.problem_id;
      option.textContent = `🌾 ${problem.name}`;
      select.appendChild(option);
    });
  } catch (error) {
    console.error('Error loading problems:', error);
    showError('समस्या लोड करताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा.');
  }
}

async function showSolution() {
  const select = document.getElementById('problemSelect');
  const resultDiv = document.getElementById('result');
  const selectedValue = select.value;
  if (!selectedValue) { showError('कृपया पहिले एक समस्या निवडा'); return; }
  try {
    resultDiv.innerHTML = '<div class="loading">⏳ उपाय शोधत आहे...</div>';
    const response = await fetch(`${apiBase}/problems/${selectedValue}/solutions`);
    if (!response.ok) throw new Error('उपाय लोड करू शकलो नाही');
    const data = await response.json();
    const problem = data.problem;
    const solutions = data.solutions;
    if (!solutions || solutions.length === 0) { resultDiv.innerHTML = '<div class="error-message">⚠️ या समस्येचा कोणी उपाय मिळाला नाही.</div>'; return; }
    let html = `<div class="solution-card"><h2 class="problem-title">🌾 ${problem.name}</h2><p style="color: #666; margin: 0.5rem 0; font-style: italic;">समस्या: ${problem.symptoms}</p></div>`;
    solutions.forEach((solution, index) => {
      html += `
        <div class="solution-card">
          <h3 class="solution-title">उपाय ${index + 1}: ${solution.solution_name}</h3>
          <div class="solution-item"><label>📋 साहित्य (Ingredients):</label><p class="solution-item-text">${solution.ingredients}</p></div>
          <div class="solution-item"><label>🔧 कृती (Preparation):</label><p class="solution-item-text">${solution.preparation}</p></div>
          <div class="solution-item"><label>📊 खुराक (Dosage):</label><p class="solution-item-text">${solution.dosage}</p></div>
          <div class="solution-item"><label>⏰ वेळ (Timing):</label><p class="solution-item-text">${solution.timing}</p></div>
      `;
      if (solution.warning && solution.warning.trim()) {
        html += `<div class="warning-box"><strong>⚠️ महत्वाची सावधानी:</strong><p style="margin: 0.5rem 0 0 0;">${solution.warning}</p></div>`;
      }
      html += `</div>`;
    });
    resultDiv.innerHTML = html;
  } catch (error) {
    console.error('Error loading solutions:', error);
    showError('उपाय लोड करताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा.');
  }
}

function showError(message) { const resultDiv = document.getElementById('result'); resultDiv.innerHTML = `<div class="error-message">❌ ${message}</div>`; }

function speakText(text) {
  if (!("speechSynthesis" in window)) { alert("⚠️ तुमच्या ब्राउझरमध्ये आवाज सुविधा उपलब्ध नाही."); return; }
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "mr-IN"; utter.rate = 0.85; utter.pitch = 1.0; utter.volume = 1.0;
  window.speechSynthesis.speak(utter);
}

document.addEventListener('DOMContentLoaded', function() {
  loadProblems();
  document.getElementById('btnSearch').addEventListener('click', showSolution);
  document.getElementById('btnSpeak').addEventListener('click', function() {
    const resultDiv = document.getElementById('result'); const text = resultDiv.innerText;
    if (!text.trim() || text.includes('❌') || text.includes('⏳')) { alert("⚠️ पहिले 'उपाय दाखवा' क्लिक करून उपाय हरवा."); return; }
    speakText(text);
  });
  document.getElementById('problemSelect').addEventListener('keypress', function(event) { if (event.key === 'Enter') showSolution(); });
  const infoBtn = document.getElementById('infoBtn'); const infoModal = document.getElementById('infoModal'); const closeModal = document.getElementById('closeModal'); const closeBtn2 = document.getElementById('closeBtn2');
  infoBtn.addEventListener('click', function() { infoModal.classList.add('active'); document.body.style.overflow = 'hidden'; });
  closeModal.addEventListener('click', function() { infoModal.classList.remove('active'); document.body.style.overflow = 'auto'; });
  closeBtn2.addEventListener('click', function() { infoModal.classList.remove('active'); document.body.style.overflow = 'auto'; });
  infoModal.addEventListener('click', function(event) { if (event.target === infoModal) { infoModal.classList.remove('active'); document.body.style.overflow = 'auto'; } });
  document.addEventListener('keydown', function(event) { if (event.key === 'Escape' && infoModal.classList.contains('active')) { infoModal.classList.remove('active'); document.body.style.overflow = 'auto'; } });
});
