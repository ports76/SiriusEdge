const categories = {
  "Corporate Hero": ["Supportiveness", "Initiative", "Compliance"],
  // ... other categories
};

const questions = {
  "Supportiveness": [
    {
      question: "What does 'active listening' involve?",
      options: ["Interrupting", "Repeating your point", "Fully focusing on the speaker", "Looking away"],
      answer: "Fully focusing on the speaker"
    },
    {
      question: "How can leaders show support?",
      options: ["Ignore input", "Give praise and feedback", "Speak over others", "Change topic"],
      answer: "Give praise and feedback"
    },
    {
      question: "Supportive environments lead to:",
      options: ["Higher stress", "Better retention", "Less communication", "More conflict"],
      answer: "Better retention"
    },
    {
      question: "Which is NOT a supportive behaviour?",
      options: ["Empathy", "Judgment", "Listening", "Encouragement"],
      answer: "Judgment"
    },
    {
      question: "Leaders who support others tend to:",
      options: ["Micromanage", "Build trust", "Avoid feedback", "Ignore issues"],
      answer: "Build trust"
    },
    {
      question: "An example of supportive language is:",
      options: ["You always fail", "Let me help you", "This is pointless", "I told you so"],
      answer: "Let me help you"
    },
    {
      question: "When supporting team members, it's best to:",
      options: ["Set clear expectations", "Avoid discussions", "Blame others", "Shut down emotions"],
      answer: "Set clear expectations"
    },
    {
      question: "Supportiveness increases:",
      options: ["Turnover", "Team cohesion", "Absenteeism", "Silence"],
      answer: "Team cohesion"
    },
    {
      question: "What builds supportive culture?",
      options: ["Fear", "Rewards only", "Open dialogue", "Isolation"],
      answer: "Open dialogue"
    },
    {
      question: "Supportive leadership reduces:",
      options: ["Motivation", "Collaboration", "Stress", "Trust"],
      answer: "Stress"
    }
  ]
};

function openCategory(category) {
  const mainMenu = document.getElementById("mainMenu");
  const moduleContent = document.getElementById("moduleContent");
  mainMenu.classList.add("hidden");
  moduleContent.classList.remove("hidden");

  moduleContent.innerHTML = `<h2>${category}</h2><div id="subMenu" class="grid"></div><button onclick="goBack()">← Back</button>`;

  const subMenu = document.getElementById("subMenu");
  subMenu.innerHTML = '';
  categories[category].forEach(sub => {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.textContent = sub;
    tile.onclick = () => loadLesson(sub);
    subMenu.appendChild(tile);
  });
}

function loadLesson(sub) {
  const moduleContent = document.getElementById("moduleContent");
  const qs = questions[sub];

  if (!qs) {
    moduleContent.innerHTML = `<h3>${sub}</h3><p>Lesson coming soon...</p><button onclick="goBackToCategory()">← Back</button>`;
    return;
  }

  let html = `<h3>${sub} Quiz</h3><form id="quizForm">`;
  qs.forEach((q, i) => {
    html += `<p><strong>${i + 1}. ${q.question}</strong></p>`;
    q.options.forEach(opt => {
      html += `<label><input type="radio" name="q${i}" value="${opt}"> ${opt}</label><br>`;
    });
  });
  html += `<br><textarea id="reflection" rows="4" cols="50" placeholder="Write your reflection..."></textarea>`;
  html += `<br><button type="button" onclick="submitQuiz('${sub}')">Submit</button>`;
  html += `<button type="button" onclick="goBackToCategory()">← Back</button>`;
  html += `</form><div id="result"></div>`;

  moduleContent.innerHTML = html;
}

function submitQuiz(sub) {
  const form = document.getElementById("quizForm");
  const inputs = form.querySelectorAll("input[type=radio]:checked");
  let score = 0;
  const qs = questions[sub];

  inputs.forEach((inp, i) => {
    if (inp.value === qs[i].answer) score++;
  });

  const percent = Math.round((score / qs.length) * 100);
  const reflection = document.getElementById("reflection").value;

  document.getElementById("result").innerHTML = `
    <h4>Result</h4>
    <p>Score: ${score}/${qs.length} (${percent}%)</p>
    <p><strong>Your Reflection:</strong></p><p>${reflection || "No reflection written."}</p>
  `;
}

function goBack() {
  document.getElementById("moduleContent").classList.add("hidden");
  document.getElementById("mainMenu").classList.remove("hidden");
}

function goBackToCategory() {
  const moduleContent = document.getElementById("moduleContent");
  const sub = moduleContent.querySelector("h3")?.innerText.replace(" Quiz", "");
  const cat = Object.keys(categories).find(c => categories[c].includes(sub));
  openCategory(cat);
}
