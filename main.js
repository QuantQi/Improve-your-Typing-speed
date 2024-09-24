// main.js

// Global Variables
let currentCharIndex = 0;
let startTime, interval;
let correctCharsTyped = 0;
let totalCharsTyped = 0;
let incorrectChars = [];

// DOM Elements
const textToTypeElement = document.getElementById('character');
const leftArrow = document.getElementById('leftArrow');
const rightArrow = document.getElementById('rightArrow');
const upArrow = document.getElementById('upArrow');
const downArrow = document.getElementById('downArrow');
const leftFinger = document.getElementById('leftFinger');
const rightFinger = document.getElementById('rightFinger');
const feedback = document.getElementById('feedback');
const userInputLabel = document.getElementById('userInputLabel');
const timeElapsedElement = document.getElementById('timeElapsed');
const cpmElement = document.getElementById('cpm');
const accuracyElement = document.getElementById('accuracy');
const finalResults = document.getElementById('finalResults');
const finalTimeElapsed = document.getElementById('finalTimeElapsed');
const finalCpm = document.getElementById('finalCpm');
const finalAccuracy = document.getElementById('finalAccuracy');
const incorrectLettersElement = document.getElementById('incorrectLetters');
const restartButton = document.getElementById('restartButton');

// Initialization
window.onload = startTest;
document.addEventListener('keydown', handleKeyPress);
restartButton.addEventListener('click', handleRestart);

function startTest() {
    finalResults.classList.add('hidden');
    feedback.classList.remove('hidden');
    incorrectChars = [];
    updateIncorrectLettersPane();
    userInputLabel.innerText = '';
    userInputLabel.classList.remove('flash-red');
    startTime = new Date();
    if (interval) clearInterval(interval);
    interval = setInterval(updateTime, 100);
    correctCharsTyped = 0;
    totalCharsTyped = 0;
    displayNextCharacter();
}

function updateTime() {
    const timeElapsed = Math.floor((new Date() - startTime) / 1000);
    timeElapsedElement.innerText = timeElapsed;

    if (timeElapsed >= TEST_DURATION) {
        clearInterval(interval);
        finishTest();
    }
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
