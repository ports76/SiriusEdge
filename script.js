const categories = {
  "Corporate Hero": ["Supportiveness", "Initiative", "Compliance"],
  "Cultural Intelligence": ["CQ Questionnaire", "CQ Lessons"],
  "Non-Verbal Communication": ["Microexpressions", "Body Language"],
  "Influence": ["Authority", "Liking", "Scarcity", "Reciprocity", "Social Proof", "Commitment"],
  "Coaching": ["Listening", "Goal Setting", "Feedback"],
  "CMI": ["CMI Course List"]
};

const lessons = {
  "Supportiveness": "Supportiveness content goes here.",
  "Initiative": "Initiative content goes here.",
  "Compliance": "Compliance content goes here.",
  "CQ Questionnaire": "CQ questions coming soon.",
  "CQ Lessons": "Lessons on Cultural Intelligence here.",
  "Microexpressions": "Microexpressions module based on Vanessa Van Edwards.",
  "Body Language": "Body Language module based on Science of People.",
  "Authority": "Cialdini principle: Authority.",
  "Liking": "Cialdini principle: Liking.",
  "Scarcity": "Cialdini principle: Scarcity.",
  "Reciprocity": "Cialdini principle: Reciprocity.",
  "Social Proof": "Cialdini principle: Social Proof.",
  "Commitment": "Cialdini principle: Commitment.",
  "Listening": "Effective listening skills for coaches.",
  "Goal Setting": "Setting SMART goals.",
  "Feedback": "Delivering and receiving feedback.",
  "CMI Course List": `
    <ul>
      <li>CMI Level 3 Award in Principles of Management and Leadership</li>
      <li>CMI Level 3 Certificate in Principles of Management and Leadership</li>
      <li>CMI Level 3 Diploma in Principles of Management and Leadership</li>
      <li>CMI Level 5 Award in Management and Leadership</li>
      <li>CMI Level 5 Certificate in Management and Leadership</li>
      <li>CMI Level 5 Diploma in Management and Leadership</li>
      <li>CMI Level 5 Coaching and Mentoring qualifications</li>
    </ul>
  `
};

const mainMenu = document.getElementById("mainMenu");
const moduleContent = document.getElementById("moduleContent");

Object.keys(categories).forEach(cat => {
  const tile = document.createElement("div");
  tile.className = "tile";
  tile.textContent = cat;
  tile.onclick = () => openCategory(cat);
  mainMenu.appendChild(tile);
});

function openCategory(category) {
  mainMenu.classList.add("hidden");
  moduleContent.classList.remove("hidden");
  moduleContent.innerHTML = `<h2>${category}</h2><div id="subMenu" class="grid"></div><br><button onclick="goBack()">← Back</button>`;
  const subMenu = document.getElementById("subMenu");
  categories[category].forEach(sub => {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.textContent = sub;
    tile.onclick = () => loadLesson(sub);
    subMenu.appendChild(tile);
  });
}

function loadLesson(sub) {
  moduleContent.innerHTML = `<h3>${sub} Lesson</h3><p>${lessons[sub] || "Lesson content coming soon."}</p><br><button onclick="goBackToCategory()">← Back</button>`;
}

function goBack() {
  moduleContent.classList.add("hidden");
  mainMenu.classList.remove("hidden");
}

function goBackToCategory() {
  const activeCategory = Object.keys(categories).find(cat =>
    categories[cat].some(sub => moduleContent.innerHTML.includes(sub))
  );
  openCategory(activeCategory);
}
