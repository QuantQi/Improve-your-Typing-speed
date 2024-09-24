const characters = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "!",
    "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "[", "]",
    "{", "}", "|", ";", ":", "'", "\"", ",", ".", "/", "<", ">", "?",
    "`", "~", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", 
    "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", 
    "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", 
    "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", 
    "Y", "Z", "Space"
];

// Define keys for left and right hands
const leftHandKeys = "1!2@3#4$5%qwertasdfgzxcvbQWERTASDFGZXCVB".split('');
const rightHandKeys = "6^7&8*9(0)-_=+yuiop[]\\hjkl;'nm,./YUIOP{}|HJKL:\"NM<>?".split('');

// Define rows for up and down
const topRowKeys = "1234567890qwertyuiopQWERTYUIOP".split('');
const homeRowKeys = "asdfghjkl;ASDFGHJKL:".split('');
const bottomRowKeys = "zxcvbnm,./ZXCVBNM<>?".split('');

// Define finger assignments (1 = thumb, 5 = pinky)
const fingerAssignments = {
    'left': {
        5: "1!qazQAZ`~",
        4: "2@wsxWSX",
        3: "3#edcEDC",
        2: "4$rfv5%tgbRFV5%TGB",
        1: "Space"
    },
    'right': {
        1: "Space",
        2: "6^yhn7&ujmYHN7&UJM",
        3: "8*ik,IK<",
        4: "9(ol.OL>",
        5: "0)p;/-_=+[{]}\\|P:?'\""
    }
};

let currentCharIndex = 0;
let startTime, interval;
let correctCharsTyped = 0;
let totalCharsTyped = 0;
let incorrectChars = [];

const textToTypeElement = document.getElementById('character');
const leftArrow = document.getElementById('leftArrow');
const rightArrow = document.getElementById('rightArrow');
const upArrow = document.getElementById('upArrow');
const downArrow = document.getElementById('downArrow');
const leftFinger = document.getElementById('leftFinger');
const rightFinger = document.getElementById('rightFinger');
const feedback = document.getElementById('feedback');
const userInput = document.getElementById('userInput');
const timeElapsedElement = document.getElementById('timeElapsed');
const cpmElement = document.getElementById('cpm');
const accuracyElement = document.getElementById('accuracy');
const finalResults = document.getElementById('finalResults');
const finalTimeElapsed = document.getElementById('finalTimeElapsed');
const finalCpm = document.getElementById('finalCpm');
const finalAccuracy = document.getElementById('finalAccuracy');

window.onload = startTest;
userInput.addEventListener('input', handleInput);
document.getElementById('restartButton').addEventListener('click', startTest);

function startTest() {
    finalResults.classList.add('hidden');
    feedback.classList.remove('hidden');
    userInput.disabled = false; // Enable input
    userInput.value = '';
    userInput.focus();
    startTime = new Date();
    if (interval) clearInterval(interval);
    interval = setInterval(updateTime, 100);
    correctCharsTyped = 0;
    totalCharsTyped = 0;
    incorrectChars = [];
    updateIncorrectLettersPane();
    displayNextCharacter();
}

function updateTime() {
    const timeElapsed = Math.floor((new Date() - startTime) / 1000);
    timeElapsedElement.innerText = timeElapsed;

    if (timeElapsed >= 300) {  // 5-minute test duration
        clearInterval(interval);
        finishTest();
    }
}

function handleInput(event) {
    const typedChar = userInput.value.trim();
    totalCharsTyped++;

    const expectedChar = characters[currentCharIndex];

    if (expectedChar === "Space" && (event.inputType === "insertText" || typedChar === ' ')) {
        correctCharsTyped++;
        userInput.value = '';
        displayNextCharacter();
    } else if (typedChar === expectedChar) {
        correctCharsTyped++;
        userInput.value = '';
        displayNextCharacter();
    } else {
        // Incorrect character
        userInput.value = '';
        flashRed();
        incorrectChars.push(typedChar || '[Space]');
        updateIncorrectLettersPane();
    }

    updateFeedback();
}

function updateFeedback() {
    const timeElapsed = Math.floor((new Date() - startTime) / 1000);
    const cpm = Math.floor((correctCharsTyped / timeElapsed) * 60);
    const accuracy = (correctCharsTyped / totalCharsTyped) * 100;

    cpmElement.innerText = isNaN(cpm) || !isFinite(cpm) ? 0 : cpm;
    accuracyElement.innerText = isNaN(accuracy) ? 0 : accuracy.toFixed(2);
}

function finishTest() {
    const timeElapsed = (new Date() - startTime) / 1000;
    const cpm = Math.floor((correctCharsTyped / timeElapsed) * 60);
    const accuracy = (correctCharsTyped / totalCharsTyped) * 100;

    finalTimeElapsed.innerText = timeElapsed.toFixed(2);
    finalCpm.innerText = cpm;
    finalAccuracy.innerText = accuracy.toFixed(2);

    feedback.classList.add('hidden');
    finalResults.classList.remove('hidden');
    userInput.disabled = true; // Disable input after test ends
}

function displayNextCharacter() {
    // Get a random character
    currentCharIndex = Math.floor(Math.random() * characters.length);
    const currentChar = characters[currentCharIndex];
    textToTypeElement.innerHTML = currentChar === "Space" ? "[Space]" : currentChar;

    // Show hand arrows and finger hints
    const leftHand = isLeftHand(currentChar);
    const fingerNumber = getFingerNumber(currentChar);

    if (leftHand) {
        leftArrow.innerText = "arrow_left";
        rightArrow.innerText = "";
        leftFinger.innerText = fingerNumber;
        rightFinger.innerText = "";
    } else if (leftHand === false) {
        leftArrow.innerText = "";
        rightArrow.innerText = "arrow_right";
        leftFinger.innerText = "";
        rightFinger.innerText = fingerNumber;
    } else {
        leftArrow.innerText = "";
        rightArrow.innerText = "";
        leftFinger.innerText = "";
        rightFinger.innerText = "";
    }

    // Show position arrows (up or down)
    if (topRowKeys.includes(currentChar)) {
        upArrow.innerText = "arrow_upward";
        downArrow.innerText = "";
    } else if (homeRowKeys.includes(currentChar)) {
        upArrow.innerText = "";
        downArrow.innerText = "";
    } else if (bottomRowKeys.includes(currentChar)) {
        upArrow.innerText = "";
        downArrow.innerText = "arrow_downward";
    } else {
        upArrow.innerText = "";
        downArrow.innerText = "";
    }
}

function isLeftHand(char) {
    if (leftHandKeys.includes(char)) return true;
    if (rightHandKeys.includes(char)) return false;
    return null; // For keys that are not specifically assigned
}

function getFingerNumber(char) {
    for (let hand in fingerAssignments) {
        for (let finger in fingerAssignments[hand]) {
            const keys = fingerAssignments[hand][finger];
            if (keys.includes(char)) {
                return finger;
            }
        }
    }
    return ""; // If not found
}

function flashRed() {
    userInput.classList.add('flash-red');
    setTimeout(() => {
        userInput.classList.remove('flash-red');
    }, 1000); // Flash red for 1 second
}

function updateIncorrectLettersPane() {
    const incorrectLettersElement = document.getElementById('incorrectLetters');
    incorrectLettersElement.innerText = incorrectChars.join(' ');
}
