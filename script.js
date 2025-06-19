const categories = {
  "Corporate Hero": ["Supportiveness", "Initiative", "Compliance"],
  "Cultural Intelligence": ["CQ Questionnaire", "CQ Lessons"],
  "Non-Verbal Communication": ["Microexpressions", "Body Language"],
  "Influence": ["Authority", "Liking", "Scarcity", "Reciprocity", "Social Proof", "Commitment"],
  "Coaching": ["Listening", "Goal Setting", "Feedback"],
  "CMI": ["CMI Course List"]
};

const lessons = {
  "CMI Course List": `
    <ul>
      <li>CMI Level 3 Award in Principles of Management and Leadership</li>
      <li>CMI Level 3 Certificate in Principles of Management and Leadership</li>
      <li>CMI Level 3 Diploma in Principles of Management and Leadership</li>
      <li>CMI Level 5 Award in Management and Leadership</li>
      <li>CMI Level 5 Certificate in Management and Leadership</li>
      <li>CMI Level 5 Diploma in Management and Leadership</li>
      <li>CMI Level 5 Extended Diploma in Management and Leadership</li>
      <li>CMI Level 5 Certificate in Coaching and Mentoring</li>
      <li>CMI Level 5 Diploma in Coaching and Mentoring</li>
    </ul>
  `
};

const questions = {
  "Supportiveness": [
    {
      question: "What is active listening?",
      options: ["Interrupting", "Focusing fully", "Multitasking"],
      answer: "Focusing fully"
    },
    {
      question: "Which phrase shows support?",
      options: ["That’s a bad idea", "Let’s explore that", "You’re wrong"],
      answer: "Let’s explore that"
    },
    {
      question: "Best time to give feedback?",
      options: ["After incident", "Next week", "Never"],
      answer: "After incident"
    },
    {
      question: "Supportive leaders are...",
      options: ["Dismissive", "Approachable", "Strict"],
      answer: "Approachable"
    },
    {
      question: "To validate a teammate, you should...",
      options: ["Ignore them", "Say 'I see your point'", "Correct them"],
      answer: "Say 'I see your point'"
    },
    {
      question: "Support fosters...",
      options: ["Distrust", "Engagement", "Resentment"],
      answer: "Engagement"
    },
    {
      question: "Feedback should be...",
      options: ["Generic", "Actionable", "Harsh"],
      answer: "Actionable"
    },
    {
      question: "Empathy is shown by...",
      options: ["Talking over others", "Mirroring emotions", "Ignoring feelings"],
      answer: "Mirroring emotions"
    },
    {
      question: "Best supportive phrase?",
      options: ["Get over it", "I understand", "Not again"],
      answer: "I understand"
    },
    {
      question: "Support builds...",
      options: ["Fear", "Trust", "Isolation"],
      answer: "Trust"
    }
  ]
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
  moduleContent.innerHTML = `<h2>${category}</h2><button onclick="goBack()">← Back</button><div id="subMenu" class="grid"></div>`;
  const subMenu = document.getElementById("subMenu");
  categories[category].forEach(sub => {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.textContent = sub;
    tile.onclick = () => {
      if (questions[sub]) startQuiz(sub);
      else loadLesson(sub);
    };
    subMenu.appendChild(tile);
  });
}

function loadLesson(sub) {
  moduleContent.innerHTML = `<h2>${sub}</h2><div>${lessons[sub] || "Content coming soon."}</div><button onclick="goBackToCategory()">← Back</button>`;
}

function startQuiz(sub) {
  let score = 0;
  let index = 0;
  const userAnswers = [];

  function renderQuestion() {
    const q = questions[sub][index];
    moduleContent.innerHTML = `
      <h2>${sub} - Question ${index + 1}</h2>
      <p>${q.question}</p>
      ${q.options.map(opt => `<button onclick="checkAnswer('${opt}')">${opt}</button>`).join("<br>")}
      <br><button onclick="goBackToCategory()">← Back</button>
    `;
  }

  window.checkAnswer = function (choice) {
    userAnswers.push({ q: questions[sub][index].question, selected: choice });
    if (choice === questions[sub][index].answer) score++;
    index++;
    if (index < questions[sub].length) renderQuestion();
    else showResult();
  };

  function showResult() {
    const percentage = Math.round((score / questions[sub].length) * 100);
    const journalPrompt = `
      <h3>Your Reflection</h3>
      <textarea rows="6" cols="50" placeholder="What did you learn? What surprised you? What will you apply?"></textarea>
      <br><button onclick="goBack()">← Back to Menu</button>
    `;
    moduleContent.innerHTML = `
      <h2>Quiz Complete</h2>
      <p>You scored ${score}/${questions[sub].length} (${percentage}%)</p>
      ${journalPrompt}
    `;
  }

  renderQuestion();
}

function goBack() {
  moduleContent.classList.add("hidden");
  mainMenu.classList.remove("hidden");
}

function goBackToCategory() {
  moduleContent.innerHTML = "";
  mainMenu.classList.remove("hidden");
  moduleContent.classList.add("hidden");
}
