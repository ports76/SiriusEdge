const categories = {
  "Corporate Hero": ["Supportiveness"]
};

const questions = {
  "Supportiveness": [
    {
      question: "What is active listening?",
      options: ["Interrupting the speaker", "Fully focusing on the speaker", "Multitasking while listening"],
      answer: "Fully focusing on the speaker"
    },
    {
      question: "How can leaders show support?",
      options: ["Criticize often", "Provide constructive feedback", "Avoid communication"],
      answer: "Provide constructive feedback"
    },
    {
      question: "Supportiveness in a team encourages:",
      options: ["Isolation", "Collaboration", "Competition"],
      answer: "Collaboration"
    },
    {
      question: "Which behavior best reflects supportiveness?",
      options: ["Ignoring concerns", "Listening and offering help", "Delegating everything"],
      answer: "Listening and offering help"
    },
    {
      question: "What phrase shows supportive leadership?",
      options: ["Figure it out yourself", "Let’s solve this together", "That’s not my problem"],
      answer: "Let’s solve this together"
    },
    {
      question: "Being supportive improves:",
      options: ["Conflict", "Trust", "Miscommunication"],
      answer: "Trust"
    },
    {
      question: "What skill enhances supportiveness?",
      options: ["Blaming", "Judging", "Empathy"],
      answer: "Empathy"
    },
    {
      question: "What’s a good example of supporting a peer?",
      options: ["Correcting them publicly", "Offering to help them improve", "Telling them to quit"],
      answer: "Offering to help them improve"
    },
    {
      question: "Which leadership style is most supportive?",
      options: ["Autocratic", "Transformational", "Laissez-faire"],
      answer: "Transformational"
    },
    {
      question: "Supportiveness in leadership leads to:",
      options: ["Burnout", "Retention", "Turnover"],
      answer: "Retention"
    }
  ]
};

const mainMenu = document.getElementById("mainMenu");
const moduleContent = document.getElementById("moduleContent");
const moduleTitle = document.getElementById("moduleTitle");
const questionContainer = document.getElementById("questionContainer");
const scoreContainer = document.getElementById("scoreContainer");
const reflectionContainer = document.getElementById("reflectionContainer");
const submitQuiz = document.getElementById("submitQuiz");
const viewScoresBtn = document.getElementById("viewScores");
const retakeQuizBtn = document.getElementById("retakeQuiz");

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
  moduleTitle.textContent = category;
  const subModules = categories[category];
  questionContainer.innerHTML = '';
  subModules.forEach(sub => {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.textContent = sub;
    tile.onclick = () => loadLesson(sub);
    questionContainer.appendChild(tile);
  });
  hideExtras();
}

function loadLesson(subcategory) {
  moduleTitle.textContent = subcategory;
  questionContainer.innerHTML = '';
  const qs = questions[subcategory];
  if (!qs) {
    questionContainer.innerHTML = "Lesson content coming soon.";
    return;
  }
  qs.forEach((q, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p><strong>Q${index + 1}:</strong> ${q.question}</p>
      ${q.options.map(opt =>
        `<label><input type="radio" name="q${index}" value="${opt}"/> ${opt}</label><br/>`).join('')}
    `;
    questionContainer.appendChild(div);
  });
  reflectionContainer.classList.remove("hidden");
  submitQuiz.classList.remove("hidden");
  viewScoresBtn.classList.add("hidden");
  retakeQuizBtn.classList.add("hidden");
  scoreContainer.innerHTML = '';
}

function submitAnswers() {
  const subcategory = moduleTitle.textContent;
  const qs = questions[subcategory];
  let score = 0;
  qs.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected && selected.value === q.answer) {
      score++;
    }
  });
  scoreContainer.innerHTML = `<p>Your score: ${score} out of ${qs.length}</p>`;
  scoreContainer.classList.remove("hidden");
  submitQuiz.classList.add("hidden");
  viewScoresBtn.classList.remove("hidden");
  retakeQuizBtn.classList.remove("hidden");
}

function viewScores() {
  alert(scoreContainer.textContent + "\nReflection: " + document.getElementById("reflectionText").value);
}

function retakeQuiz() {
  loadLesson(moduleTitle.textContent);
  document.getElementById("reflectionText").value = '';
}

function goBack() {
  moduleContent.classList.add("hidden");
  mainMenu.classList.remove("hidden");
  hideExtras();
}

function hideExtras() {
  questionContainer.innerHTML = '';
  reflectionContainer.classList.add("hidden");
  submitQuiz.classList.add("hidden");
  viewScoresBtn.classList.add("hidden");
  retakeQuizBtn.classList.add("hidden");
  scoreContainer.classList.add("hidden");
}
