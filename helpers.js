// helpers.js

// Helper functions

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

function flashRed(element) {
    element.classList.add('flash-red');
    setTimeout(() => {
        element.classList.remove('flash-red');
    }, 1000); // Flash red for 1 second
}

function updateIncorrectLettersPane() {
    incorrectLettersElement.innerText = incorrectLettersElement.innerText = incorrectChars;//.map(item => item[1] + ' -> ' + item[0]).join('->');
    console.log(`Updated Incorrect Letters: ${incorrectLettersElement.innerText}`);
}



