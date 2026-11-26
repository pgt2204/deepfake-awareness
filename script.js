// Welcome message when the website loads
console.log("Welcome to Verify Before You Trust!");

// Test button functionality
function showMessage() {
    alert("Welcome to our Deepfake Awareness Website!");
}
// Verification checklist functionality

const verifyBoxes = document.querySelectorAll(".verify");

verifyBoxes.forEach(function(box) {

    box.addEventListener("change", function() {

        let completed = document.querySelectorAll(
            ".verify:checked"
        ).length;

        let total = verifyBoxes.length;

        let percentage = (completed / total) * 100;

        document.getElementById("progress-text").innerText =
            completed + " out of " + total + " completed";

        document.getElementById("progress-fill").style.width =
            percentage + "%";

    });

});
const missions = [
    {
        title: "The Suspicious Photo",
        description: "You receive a photograph online claiming to show a famous person making an announcement. The source is unknown. What should you do first?",
        options: [
            "A. Share it immediately",
            "B. Check the original source",
            "C. Believe it because it looks real"
        ],
        correct: 1,
        explanation: "Correct! Checking the original source is an important first step."
    },
    {
        title: "The Unknown Voice",
        description: "You receive an audio message that sounds like someone you know asking for urgent help. What is the safest response?",
        options: [
            "A. Send money immediately",
            "B. Forward the audio to everyone",
            "C. Contact the person through a trusted number"
        ],
        correct: 2,
        explanation: "Correct! Verify the request directly through a trusted contact method."
    },
    {
        title: "The Viral Video",
        description: "A video is spreading online with a shocking claim. What should you do before believing it?",
        options: [
            "A. Check trusted news sources and context",
            "B. Trust the number of views",
            "C. Share it without checking"
        ],
        correct: 0,
        explanation: "Correct! Cross-checking information with trusted sources helps prevent misinformation."
    }
];

let currentMission = 0;
let score = 0;
let answered = false;

function showMission() {
    const mission = missions[currentMission];

    document.getElementById("case-title").innerText = mission.title;
    document.getElementById("case-description").innerText = mission.description;
    document.getElementById("mission-number").innerText =
        (currentMission + 1) + "/3";

    const optionsBox = document.getElementById("game-options");
    optionsBox.innerHTML = "";

    mission.options.forEach(function(option, index) {
        const button = document.createElement("button");
        button.className = "game-option";
        button.innerText = option;
        button.onclick = function() {
            checkAnswer(index);
        };
        optionsBox.appendChild(button);
    });

    document.getElementById("game-feedback").innerText = "";
    document.getElementById("next-mission").hidden = true;
    answered = false;
}

function checkAnswer(selected) {
    if (answered) return;

    answered = true;
    const mission = missions[currentMission];
    const feedback = document.getElementById("game-feedback");

    if (selected === mission.correct) {
        score += 10;
        feedback.innerText = "✅ " + mission.explanation;
    } else {
        feedback.innerText =
            "❌ Not quite. " + mission.explanation;
    }

    document.getElementById("score").innerText = score;

    document.getElementById("next-mission").hidden = false;

    if (currentMission === missions.length - 1) {
        document.getElementById("next-mission").innerText =
            "View Final Result";
    }
}

function nextMission() {
    if (currentMission < missions.length - 1) {
        currentMission++;
        showMission();
    } else {
        document.getElementById("case-title").innerText =
            "Investigation Complete!";
        document.getElementById("case-description").innerText =
            "You completed all three missions. Your final score is " +
            score + " out of 30 points.";
        document.getElementById("game-options").innerHTML = "";
        document.getElementById("game-feedback").innerText =
            "🏆 Great work, Detective!";
        document.getElementById("next-mission").hidden = true;
        document.getElementById("mission-number").innerText = "3/3";
    }
}
window.checkAnswer = checkAnswer;
window.nextMission = nextMission;
showMission();