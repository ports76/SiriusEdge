const categories = {
  "Corporate Hero": ["Supportiveness", "Initiative", "Compliance"],
  "Nonverbal Communication": ["Microexpressions", "Body Language"],
  "Influence & Negotiation": ["Authority", "Liking", "Scarcity", "Reciprocity", "Social Proof", "Commitment"],
  "CMI Courses": ["Level 3 Coaching", "Level 5 Leadership", "Team Management", "Strategic Decision-Making"]
};

const lessons = {
  "Supportiveness": "Supportive leaders create trust, psychological safety, and team loyalty...",
  "Initiative": "Taking initiative is about being proactive, anticipating needs, and solving problems...",
  "Compliance": "Compliance in leadership involves policy adherence and ethical integrity...",
  "Microexpressions": "Microexpressions are brief, involuntary facial expressions revealing true emotions...",
  "Body Language": "Effective leaders master posture, gestures, and facial cues...",
  "Authority": "Use expertise and confident communication to gain influence...",
  "Liking": "Be likable by being relatable, warm, and trustworthy...",
  "Scarcity": "Highlight urgency and limited availability to increase perceived value...",
  "Reciprocity": "Offer value first to trigger the natural response to return the favor...",
  "Social Proof": "Use endorsements and examples to build trust and herd behavior...",
  "Commitment": "Ask for small commitments that grow into loyalty over time...",
  "Level 3 Coaching": "Focuses on core coaching competencies...",
  "Level 5 Leadership": "Designed for senior leaders managing strategic priorities...",
  "Team Management": "Teaches conflict resolution, delegation, and communication...",
  "Strategic Decision-Making": "Emphasizes risk analysis and long-term planning..."
};

const questions = {
  "Supportiveness": [
    { q: "What is active listening?", options: ["Interrupting", "Nodding without paying attention", "Focusing fully on the speaker"], a: 2 },
    { q: "Supportive leaders often...", options: ["Avoid tough talks", "Provide timely feedback", "Ignore underperformance"], a: 1 },
    { q: "How do you show empathy?", options: ["Dismiss feelings", "Listen and validate", "Change subject"], a: 1 },
    { q: "When supporting a team, use...", options: ["Fear tactics", "Open communication", "Isolation"], a: 1 },
    { q: "Trust builds through...", options: ["Consistency", "Unpredictability", "Sarcasm"], a: 0 },
    { q: "What breaks psychological safety?", options: ["Active inclusion", "Mocking mistakes", "Listening"], a: 1 },
    { q: "To show support visually...", options: ["Cross arms", "Smile & nod", "Roll eyes"], a: 1 },
    { q: "Which is supportive?", options: ["Saying 'I told you so'", "Helping brainstorm", "Blaming others"], a: 1 },
    { q: "Support builds...", options: ["Resentment", "Morale", "Division"], a: 1 },
    { q: "Effective support includes...", options: ["Avoiding responsibility", "Timely recognition", "Micromanagement"], a: 1 }
  ]
};

const mainMenu = document.getElementById("mainMenu");
const moduleContent = document.getElementById("moduleContent");
const moduleTitle = document.getElementById("moduleTitle");
const lessonContent = document.getElementById("lessonContent");
const questionnaire = document.getElementById("questionnaire");
const reflection = document.getElementById("reflection");

Object.keys(categories).forEach(cat => {
  const tile = document.createElement("div");
  tile.className = "tile";
  tile.textContent = cat;
  tile.onclick = () => openCategory(cat);
  mainMenu.appendChild(tile);
});

let currentCategory = "";
function openCategory(category) {
  currentCategory = category;
  mainMenu.classList.add("hidden");
  moduleContent.classList.remove("hidden");
  moduleTitle.textContent = category;
  lessonContent.innerHTML = "";
  questionnaire.innerHTML = "";
  categories[category].forEach(sub => {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.textContent = sub;
    tile.onclick = () => loadSubcategory(sub);
    lessonContent.appendChild(tile);
  });
}

function loadSubcategory(sub) {
  lessonContent.innerHTML = `<p>${lessons[sub] || "Lesson coming soon."}</p>`;
  const qSet = questions[sub];
  questionnaire.innerHTML = "";
  if (qSet) {
    qSet.forEach((item, i) => {
      const block = document.createElement("div");
      block.innerHTML = `<p><b>Q${i + 1}:</b> ${item.q}</p>` + item.options.map((opt, j) =>
        `<label><input type='radio' name='q${i}' value='${j}'/> ${opt}</label><br/>`
      ).join("");
      questionnaire.appendChild(block);
    });
    const submitBtn = document.createElement("button");
    submitBtn.textContent = "Submit Answers";
    submitBtn.onclick = () => gradeQuiz(sub);
    questionnaire.appendChild(submitBtn);
    reflection.classList.remove("hidden");
  } else {
    questionnaire.innerHTML = "<p>No quiz for this subcategory yet.</p>";
    reflection.classList.add("hidden");
  }
}

function gradeQuiz(sub) {
  const qSet = questions[sub];
  let score = 0;
  qSet.forEach((item, i) => {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    if (selected && parseInt(selected.value) === item.a) score++;
  });
  alert(`You scored ${score} out of ${qSet.length}`);
}

function goBack() {
  moduleContent.classList.add("hidden");
  mainMenu.classList.remove("hidden");
}
