
const modules = {
  "the_corporate_hero": {
    "lesson": "This module explores the traits and mindset of high-performing corporate leaders\u2014those who exemplify resilience, initiative, and service under pressure. The Corporate Hero framework draws inspiration from military gallantry and applies those values to organizational leadership.",
    "questions": [
      "I remain composed when facing workplace challenges.",
      "I act in the interest of my team even when it\u2019s inconvenient.",
      "I believe in a higher purpose behind my work.",
      "I push forward when others hesitate.",
      "I encourage others to step up during crises.",
      "I perform consistently under pressure.",
      "I hold myself to high ethical standards.",
      "I reflect on decisions to learn and grow.",
      "I\u2019m trusted in high-stakes situations.",
      "I mentor others to grow professionally."
    ]
  },
  "cultural_intelligence": {
    "lesson": "This module enhances your ability to lead in multicultural environments. You\u2019ll learn how to adapt your communication and leadership style to different cultural norms, increasing your effectiveness across global and diverse teams.",
    "questions": [
      "I adapt my communication to suit different cultural contexts.",
      "I am aware of my own cultural biases.",
      "I research cultural norms before entering new environments.",
      "I can manage teams with different cultural expectations.",
      "I listen actively in cross-cultural conversations.",
      "I enjoy learning about other traditions and values.",
      "I avoid stereotyping in professional settings.",
      "I tailor my leadership to local sensitivities.",
      "I help resolve misunderstandings in multicultural groups.",
      "I consider cultural diversity a leadership asset."
    ]
  },
  "non-verbal_communication": {
    "lesson": "This module teaches you to understand and master body language, facial micro-expressions, and other non-verbal cues that influence professional interactions. You\u2019ll become more persuasive, aware, and confident in face-to-face communication.",
    "questions": [
      "I can read people's emotions from their facial expressions.",
      "I am conscious of my posture during meetings.",
      "I notice when body language contradicts spoken words.",
      "I adjust my tone and gestures to suit the situation.",
      "I make eye contact confidently.",
      "I detect discomfort in others even when unspoken.",
      "I use non-verbal signals to emphasize key points.",
      "I can spot micro-expressions under stress.",
      "I manage my own expressions intentionally.",
      "I train others in body language awareness."
    ]
  },
  "influence": {
    "lesson": "Explore the psychology behind influence using Cialdini\u2019s principles and NLP techniques. This module empowers you to ethically persuade, negotiate, and lead with authority and trust.",
    "questions": [
      "I persuade others without being forceful.",
      "I build rapport quickly.",
      "I use logic and emotion effectively when influencing.",
      "I can adapt my message to the audience.",
      "I know when to push and when to step back.",
      "I understand Cialdini's principles of influence.",
      "I use stories to inspire action.",
      "I am aware of the impact of tone and rhythm.",
      "I influence senior stakeholders successfully.",
      "I coach others in persuasive communication."
    ]
  },
  "cmi": {
    "lesson": "This module covers key learning from CMI-accredited leadership and management courses. Topics include operational leadership, team dynamics, project delivery, and strategic execution.",
    "questions": [
      "I understand core leadership models.",
      "I have applied project planning techniques.",
      "I set SMART objectives regularly.",
      "I delegate effectively.",
      "I lead meetings with clear outcomes.",
      "I use stakeholder analysis in planning.",
      "I align team goals with business strategy.",
      "I handle conflict constructively.",
      "I evaluate leadership performance with KPIs.",
      "I apply coaching models like GROW."
    ]
  },
  "coaching": {
    "lesson": "This module gives you foundational skills in coaching others using ICF techniques, active listening, powerful questioning, and goal-oriented development plans.",
    "questions": [
      "I use open-ended questions in conversations.",
      "I let others arrive at their own insights.",
      "I separate coaching from giving advice.",
      "I use active listening techniques.",
      "I maintain a non-judgmental stance.",
      "I track progress with coaching goals.",
      "I use the GROW model effectively.",
      "I offer feedback that empowers.",
      "I recognize when to refer for mentorship.",
      "I help others identify their blind spots."
    ]
  },
  "resilience": {
    "lesson": "This module helps you strengthen your mental and emotional resilience. You\u2019ll learn cognitive techniques, stress-management tools, and practical ways to bounce back from adversity.",
    "questions": [
      "I recover quickly from setbacks.",
      "I stay calm under stress.",
      "I reframe negative situations into learning.",
      "I maintain optimism in tough times.",
      "I have a routine that builds inner strength.",
      "I manage emotions without suppressing them.",
      "I take breaks before burnout hits.",
      "I help others cope with pressure.",
      "I bounce back from professional disappointment.",
      "I set boundaries to protect my wellbeing."
    ]
  },
  "supportiveness": {
    "lesson": "Focusing on empathy and collaboration, this module shows how to foster psychological safety, build trust, and support colleagues through change and challenge.",
    "questions": [
      "I regularly check in on team wellbeing.",
      "I give time to support others with tasks.",
      "I show empathy during conflict.",
      "I listen without interrupting.",
      "I support inclusivity and fairness.",
      "I offer help without waiting to be asked.",
      "I celebrate others' successes.",
      "I protect others from toxic behaviors.",
      "I am seen as a team player.",
      "I promote a sense of belonging at work."
    ]
  },
  "compliance": {
    "lesson": "Understand the importance of organizational, legal, and ethical compliance. This module ensures you act with integrity while meeting professional standards and protocols.",
    "questions": [
      "I understand relevant industry regulations.",
      "I follow company procedures closely.",
      "I report risks proactively.",
      "I encourage ethical decision-making.",
      "I document actions clearly.",
      "I maintain confidentiality and discretion.",
      "I ensure team members follow protocol.",
      "I promote a culture of accountability.",
      "I update myself on compliance requirements.",
      "I take responsibility when mistakes are made."
    ]
  }
};

function navigate(moduleId) {
    const module = modules[moduleId];
    if (!module) {
        alert("Module not found.");
        return;
    }

    // Clear existing content
    document.body.innerHTML = "";

    // Create new layout
    const header = document.createElement("header");
    header.innerHTML = `<h1>{moduleId.replace("_", " ").toUpperCase()}</h1>`;
    document.body.appendChild(header);

    const lesson = document.createElement("section");
    lesson.className = "lesson";
    lesson.innerHTML = `<h2>Lesson</h2><p>{module.lesson}</p>`;
    document.body.appendChild(lesson);

    const quiz = document.createElement("section");
    quiz.className = "quiz";
    quiz.innerHTML = "<h2>Assessment</h2>";

    module.questions.forEach((question, index) => {
        const qDiv = document.createElement("div");
        qDiv.className = "question";
        let qHtml = `<p><strong>Q{index + 1}:</strong> {question}</p><div class='scale'>`;
        for (let i = 1; i <= 7; i++) {
            qHtml += `<label><input type='radio' name='q{index}' value='{i}'> {i}</label>`;
        }
        qHtml += "</div>";
        qDiv.innerHTML = qHtml;
        quiz.appendChild(qDiv);
    });

    document.body.appendChild(quiz);
}

// PDF download using html2pdf.js (assumes integration later)
function downloadPDF(moduleId) {
    const element = document.body;
    const opt = {
        margin:       0.5,
        filename:     moduleId + '_lesson.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(element).set(opt).save();
}

// HeroBot (placeholder)
function addHeroBot() {
    const chat = document.createElement("div");
    chat.className = "herobot";
    chat.innerHTML = `
        <h3>Ask HeroBot</h3>
        <textarea placeholder='Ask a question about this module...'></textarea><br>
        <button onclick="alert('HeroBot: Great question! (AI response placeholder)')">Send</button>
    `;
    document.body.appendChild(chat);
}

// Call HeroBot and add PDF button on module load
function navigate(moduleId) {
    const module = modules[moduleId];
    if (!module) {
        alert("Module not found.");
        return;
    }

    document.body.innerHTML = "";

    const header = document.createElement("header");
    header.innerHTML = `<h1>${moduleId.replace("_", " ").toUpperCase()}</h1>`;
    document.body.appendChild(header);

    const lesson = document.createElement("section");
    lesson.className = "lesson";
    lesson.innerHTML = `<h2>Lesson</h2><p>${module.lesson}</p><button onclick="downloadPDF('${moduleId}')">ð Download Lesson PDF</button>`;
    document.body.appendChild(lesson);

    const quiz = document.createElement("section");
    quiz.className = "quiz";
    quiz.innerHTML = "<h2>Assessment</h2>";

    module.questions.forEach((question, index) => {
        const qDiv = document.createElement("div");
        qDiv.className = "question";
        let qHtml = `<p><strong>Q${index + 1}:</strong> ${question}</p><div class='scale'>`;
        for (let i = 1; i <= 7; i++) {
            qHtml += `<label><input type='radio' name='q${index}' value='${i}'> ${i}</label>`;
        }
        qHtml += "</div>";
        qDiv.innerHTML = qHtml;
        quiz.appendChild(qDiv);
    });

    document.body.appendChild(quiz);
    addHeroBot();
}
