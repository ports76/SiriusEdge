const categories = {
    "Corporate Hero": ["Supportiveness", "Initiative", "Compliance"],
    "Cultural Intelligence": ["CQ Questionnaire", "CQ Lessons"],
    "Non-Verbal Communication": ["Microexpressions", "Body Language"],
    "Influence": ["Authority", "Liking", "Scarcity", "Reciprocity", "Social Proof", "Commitment"],
    "Coaching": ["Listening", "Goal Setting", "Feedback"],
    "CMI": ["Course Catalogue"]
};

const lessons = {
    "Supportiveness": `
        <h3>Supportiveness</h3>
        <p>1. What is active listening?<br>A. Interrupting the speaker<br>B. Fully focusing on the speaker ✅<br>C. Multitasking while listening</p>
        <p>2. How can leaders show support?<br>A. Criticize often<br>B. Provide constructive feedback ✅<br>C. Avoid communication</p>
        <!-- Add remaining 8 questions in similar format -->
        <p><strong>Reflection:</strong><br><textarea placeholder="Write your thoughts here..." rows="4" cols="50"></textarea></p>
        <p><strong>Score:</strong> You scored 2/10 (example)</p>
    `,
    "Course Catalogue": `
        <h3>CMI Courses Offered</h3>
        <ul>
            <li>CMI Level 3 Award in Principles of Management and Leadership</li>
            <li>CMI Level 3 Certificate in Principles of Management and Leadership</li>
            <li>CMI Level 3 Diploma in Principles of Management and Leadership</li>
            <li>CMI Level 5 Award in Management and Leadership</li>
            <li>CMI Level 5 Certificate in Management and Leadership</li>
            <li>CMI Level 5 Diploma in Management and Leadership</li>
            <li>CMI Level 5 Extended Diploma in Management and Leadership</li>
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
    moduleContent.innerHTML = `<button onclick="goBack()">← Back</button><h2>${category}</h2><div id="subMenu" class="grid"></div>`;
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
    moduleContent.innerHTML = `
        <button onclick="goBackToCategory()">← Back</button>
        <h2>${sub}</h2>
        ${lessons[sub] || "<p>Lesson content coming soon.</p>"}
    `;
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
