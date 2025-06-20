const categories = {
  "Corporate Hero": ["Supportiveness", "Initiative", "Compliance"],
  "CMI Courses": ["Level 3 Coaching", "Level 5 Management", "Strategic Leadership"],
  "Nonverbal Communication": ["Microexpressions", "Body Language"],
  "Influence & Negotiation": ["Authority", "Liking", "Scarcity", "Reciprocity", "Social Proof", "Commitment"]
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
      question: "What is emotional support?",
      options: ["Ignoring emotions", "Listening and validating", "Offering solutions only"],
      answer: "Listening and validating"
    },
    {
      question: "Why is empathy important in leadership?",
      options: ["It weakens authority", "It builds trust", "It shows weakness"],
      answer: "It builds trust"
    },
    {
      question: "Which of the following supports teamwork?",
      options: ["Blame culture", "Open communication", "Micromanagement"],
      answer: "Open communication"
    },
    {
      question: "What does offering help indicate?",
      options: ["Overstepping", "Supportiveness", "Insecurity"],
      answer: "Supportiveness"
    },
    {
      question: "What phrase best shows support?",
      options: ["You’re wrong", "I understand your view", "That’s irrelevant"],
      answer: "I understand your view"
    },
    {
      question: "What’s the outcome of strong support systems?",
      options: ["Isolation", "Burnout", "Resilience"],
      answer: "Resilience"
    },
    {
      question: "Supportive leaders often...",
      options: ["Avoid feedback", "Encourage growth", "Ignore emotions"],
      answer: "Encourage growth"
    },
    {
      question: "What’s a key support trait?",
      options: ["Judgment", "Patience", "Dismissiveness"],
      answer: "Patience"
    }
  ]
};

const mainMenu = document.getElementById("mainMenu");
const moduleContent = document.getElementById("moduleContent");
const subMenu = document.getElementById("subMenu");

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
  subMenu.innerHTML = "";
  categories[category].forEach(sub => {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.textContent = sub;
    tile.onclick = () => {
      if (questions[sub]) {
        loadQuiz(sub);
      } else {
        showPlaceholder(sub);
      }
    };
    subMenu.appendChild(tile);
  });
}

function showPlaceholder(title) {
  subMenu.innerHTML = `<h2>${title}</h2><p>Lesson content coming soon.</p><button onclick="goBack()">← Back</button>`;
}

function loadQuiz(topic) {
  const quiz = questions[topic];
  let score = 0;
  let index = 0;
  const container = document.getElementById("subMenu");
  container.innerHTML = "";

  function showQuestion() {
    const q = quiz[index];
    container.innerHTML = `
      <div class="question-block">
        <div class="question">${q.question}</div>
        <div class="options">
          ${q.options.map(opt => `<label><input type="radio" name="q${index}" value="${opt}"> ${opt}</label><br>`).join("")}
        </div>
        <button onclick="submitAnswer()">Submit</button>
      </div>
    `;
  }

  window.submitAnswer = function () {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected && selected.value === quiz[index].answer) score++;
    index++;
    if (index < quiz.length) {
      showQuestion();
    } else {
      container.innerHTML = `<h2>Score: ${score}/${quiz.length}</h2><p>Reflect: What did you learn?</p><textarea rows="4" cols="50" placeholder="Your thoughts..."></textarea><br><button onclick="goBack()">← Back</button>`;
    }
  };

  showQuestion();
}

function goBack() {
  moduleContent.classList.add("hidden");
  mainMenu.classList.remove("hidden");
}
