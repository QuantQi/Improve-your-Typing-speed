// main.js

// Global Variables
//let currentCharIndex = 0;
let startTime, interval;
let correctCharsTyped = 0;
let totalCharsTyped = 0;
let incorrectChars = [];

// DOM Elements
const textToTypeElement = document.getElementById('character');
const characterBox = document.getElementById('characterBox');
const leftArrow = document.getElementById('leftArrow');
const rightArrow = document.getElementById('rightArrow');
const upArrow = document.getElementById('upArrow');
const downArrow = document.getElementById('downArrow');
const fingerNumberElement = document.getElementById('fingerNumber');
const feedback = document.getElementById('feedback');
const timeElapsedElement = document.getElementById('timeElapsed');
const cpmElement = document.getElementById('cpm');
const accuracyElement = document.getElementById('accuracy');
const finalResults = document.getElementById('finalResults');
const finalTimeElapsed = document.getElementById('finalTimeElapsed');
const finalCpm = document.getElementById('finalCpm');
const finalAccuracy = document.getElementById('finalAccuracy');
const restartButton = document.getElementById('restartButton');

// Initialization
window.onload = startTest; // Start test when page loads
document.addEventListener('keydown', handleKeyPress);

restartButton.addEventListener('click', handleRestart);

// Select all radio buttons
const radioButtons = document.querySelectorAll('input[name="keyRow"]');

// Add event listener to each radio button to restart test on change
radioButtons.forEach(radio => {
    radio.addEventListener('change', handleRestart);
});



function startTest() {

    displayNextCharacter();

    //wait for keypress to start timer
    document.addEventListener('keydown', startTimerOnce);

    function startTimerOnce(event) {
        if (event.key !== "Shift") {
            startTime = new Date();
            if (interval) clearInterval(interval);
            interval = setInterval(updateTime, 100);
            document.removeEventListener('keydown', startTimerOnce);
        }
    }

    finalResults.classList.add('hidden');
    feedback.classList.remove('hidden');
    characterBox.classList.remove('flash-red');
   // startTime = new Date();
   // if (interval) clearInterval(interval);
   // interval = setInterval(updateTime, 100);
    correctCharsTyped = 0;
    totalCharsTyped = 0;
   

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
    // Calculate the time elapsed since 'startTime' in seconds
    const timeElapsed = Math.floor((new Date() - startTime) / 1000);
    
    // Calculate the characters per minute (CPM)
    // 'correctCharsTyped' is the number of correct characters typed by the user
    // 'timeElapsed' is the time elapsed in seconds, so we divide by 60 to convert to minutes
    const cpm = Math.floor((correctCharsTyped / timeElapsed) * 60);
    
    // Calculate the typing accuracy as a percentage
    // 'correctCharsTyped' is the number of correct characters typed by the user
    // 'totalCharsTyped' is the total number of characters typed by the user
    const accuracy = (correctCharsTyped / totalCharsTyped) * 100;
    
    // Update the CPM display element
    // If 'cpm' is NaN (Not-a-Number) or not finite (e.g., due to division by zero), set it to 0
    cpmElement.innerText = isNaN(cpm) || !isFinite(cpm) ? 0 : cpm;
    
    // Update the accuracy display element
    // If 'accuracy' is NaN, set it to 0, otherwise format it to 2 decimal places
    accuracyElement.innerText = isNaN(accuracy) ? 0 : accuracy.toFixed(2);
}

function finishTest() {
    // Calculate the total time elapsed in seconds since the start of the test
    const timeElapsed = (new Date() - startTime) / 1000;

    // Calculate the characters per minute (CPM)
    // 'correctCharsTyped' is the number of correct characters typed by the user
    // 'timeElapsed' is the time elapsed in seconds, so we divide by 60 to convert to minutes
    const cpm = Math.floor((correctCharsTyped / timeElapsed) * 60);

    // Calculate the typing accuracy as a percentage
    // 'correctCharsTyped' is the number of correct characters typed by the user
    // 'totalCharsTyped' is the total number of characters typed by the user
    const accuracy = (correctCharsTyped / totalCharsTyped) * 100;

    // Update the final time elapsed display element
    // 'toFixed(2)' formats the number to 2 decimal places
    finalTimeElapsed.innerText = timeElapsed.toFixed(2);

    // Update the final CPM display element
    finalCpm.innerText = cpm;

    // Update the final accuracy display element
    // 'toFixed(2)' formats the number to 2 decimal places
    finalAccuracy.innerText = accuracy.toFixed(2);

    // Hide the feedback section
    feedback.classList.add('hidden');

    // Show the final results section
    finalResults.classList.remove('hidden');
}

function getCharacterSet(selectedRow = null) {
   selectedRow = (selectedRow==null) ? document.querySelector('input[name="keyRow"]:checked').value :selectedRow;
   
    switch (selectedRow) {
        case 'top':
            return {
                numRowKeys: keyRows_default.numRowKeys,
                topRowKeys: keyRows_default.topRowKeys
            };
        case 'home':
            return {
                homeRowKeys: keyRows_default.homeRowKeys
            };
        case 'bottom':
            return {
                bottomRowKeys: keyRows_default.bottomRowKeys
            };
        default:
            return keyRows_default;
    }
}

function displayNextCharacter() {
    const charactersToUse = getCharacterSet();
    //console.log(charactersToUse);
    var keys = Object.keys(charactersToUse);
    var randomIndex = Math.floor(Math.random() * keys.length);
    const rowArr = charactersToUse[keys[randomIndex]];

    //select wShift or woShift key in the row
    keys = Object.keys(rowArr);
    randomIndex = Math.floor(Math.random() * keys.length);
    const row = rowArr[keys[randomIndex]];

 

    const currentCharIndex = Math.floor(Math.random() * row.length);
    currentChar = row[currentCharIndex];
    textToTypeElement.innerHTML = currentChar;

    //creat keyboard with or without shift
    createKeyboard(getCharacterSet("all"),keys[randomIndex] === "wShift",currentChar);

    //if less than half the length of the row, left hand. Otherwise right hand
    const leftHand = isLeftHand(row,currentCharIndex);

    
    const fingerNumber = getFingerNumber(row,currentCharIndex);
    fingerNumberElement.innerText = fingerNumber;

    leftArrow.innerText = "";
    rightArrow.innerText = "";
    upArrow.innerText = "";
    downArrow.innerText = "";

    if (leftHand) {
        leftArrow.innerText = "arrow_left";
    } else{
        rightArrow.innerText = "arrow_right";
    }

    //console.log(topRowKeys.wShiht.includes(currentChar));
    switch (true) {
        case keyRows_default.topRowKeys.wShift.includes(currentChar):
        case keyRows_default.topRowKeys.woShift.includes(currentChar):
        case keyRows_default.numRowKeys.wShift.includes(currentChar):
        case keyRows_default.numRowKeys.woShift.includes(currentChar):
            upArrow.innerText = "arrow_upward";
            break;
        case keyRows_default.bottomRowKeys.wShift.includes(currentChar):
        case keyRows_default.bottomRowKeys.woShift.includes(currentChar):
            downArrow.innerText = "arrow_downward";
            break;
    }
}


// Add your other helper functions like isLeftHand, getFingerNumber, etc.