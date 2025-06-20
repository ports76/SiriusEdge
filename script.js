const categories = {
  "Corporate Hero": ["Supportiveness", "Initiative", "Compliance"],
  "CMI Courses": ["CMI Full List"],
  "Nonverbal Communications": ["Microexpressions", "Body Language"],
  "Influence & Negotiation": ["Authority", "Liking", "Scarcity", "Reciprocity", "Social Proof", "Commitment"]
};

const lessons = {
  "Supportiveness": "Supportive leaders actively listen, encourage their teams, and promote psychological safety. They build a trusting environment by showing empathy, giving recognition, and being available.",
  "Initiative": "Initiative is the ability to assess and initiate things independently. Leaders who take initiative drive change and anticipate future needs before they arise.",
  "Compliance": "Compliance is about ensuring standards are followed. It includes regulatory awareness, ethical behavior, and reinforcing accountability within teams.",
  "Microexpressions": "Microexpressions are brief, involuntary facial expressions that reveal true emotions. Learning to recognize them improves emotional intelligence and communication.",
  "Body Language": "Body language conveys messages nonverbally through posture, gestures, and facial expressions. Mastery improves presence, persuasion, and trust.",
  "CMI Full List": `<ul>
    <li>CMI Level 3 Award in Principles of Management and Leadership</li>
    <li>CMI Level 3 Certificate in Principles of Management and Leadership</li>
    <li>CMI Level 3 Diploma in Principles of Management and Leadership</li>
    <li>CMI Level 5 Award in Management and Leadership</li>
    <li>CMI Level 5 Certificate in Management and Leadership</li>
    <li>CMI Level 5 Diploma in Management and Leadership</li>
    <li>CMI Level 5 Certificate in Police Management</li>
  </ul>`
};

const quizData = {
  "Supportiveness": [
    {
      question: "What is a key trait of a supportive leader?",
      options: ["Micromanaging", "Avoiding conflict", "Active listening"],
      answer: "Active listening"
    },
    {
      question: "Supportiveness builds what within a team?",
      options: ["Fear", "Compliance", "Trust"],
      answer: "Trust"
    }
    // Add 8 more...
  ]
};

let currentCategory = "";
let currentSubcategory = "";

function loadMainMenu() {
  const main = document.getElementById("mainMenu");
  main.innerHTML = "";
  Object.keys(categories).forEach(category => {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.textContent = category;
    tile.onclick = () => openCategory(category);
    main.appendChild(tile);
  });
}

function openCategory(category) {
  currentCategory = category;
  currentSubcategory = "";
  document.getElementById("mainMenu").classList.add("hidden");
  document.getElementById("moduleContent").classList.remove("hidden");
  document.getElementById("subMenu").innerHTML = "";
  document.getElementById("lessonContent").innerHTML = "";
  document.getElementById("quizContainer").classList.add("hidden");

  document.getElementById("contentHeader").textContent = category;

  categories[category].forEach(sub => {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.textContent = sub;
    tile.onclick = () => loadSubcategory(sub);
    document.getElementById("subMenu").appendChild(tile);
  });
}

function loadSubcategory(sub) {
  currentSubcategory = sub;
  document.getElementById("subMenu").innerHTML = "";
  document.getElementById("lessonContent").innerHTML = `<h3>${sub}</h3><p>${lessons[sub] || "Lesson coming soon..."}</p>`;

  if (quizData[sub]) {
    showQuiz(sub);
  } else {
    document.getElementById("quizContainer").classList.add("hidden");
  }
}

function showQuiz(sub) {
  const quizEl = document.getElementById("quizContainer");
  quizEl.classList.remove("hidden");
  quizEl.innerHTML = "";

  let score = 0;
  let currentQ = 0;

  const showQuestion = () => {
    if (currentQ >= quizData[sub].length) {
      quizEl.innerHTML = `<p>Your score: ${score} / ${quizData[sub].length}</p><textarea placeholder="Reflect on your learning..."></textarea>`;
      return;
    }

    const q = quizData[sub][currentQ];
    quizEl.innerHTML = `
      <p><strong>Q${currentQ + 1}:</strong> ${q.question}</p>
      ${q.options.map(opt => `<button onclick="submitAnswer('${opt}', '${q.answer}')">${opt}</button>`).join("<br>")}
    `;
  };

  window.submitAnswer = (selected, correct) => {
    if (selected === correct) score++;
    currentQ++;
    showQuestion();
  };

  showQuestion();
}

function goBack() {
  if (currentSubcategory) {
    openCategory(currentCategory);
  } else {
    document.getElementById("mainMenu").classList.remove("hidden");
    document.getElementById("moduleContent").classList.add("hidden");
  }
}

window.onload = loadMainMenu;
