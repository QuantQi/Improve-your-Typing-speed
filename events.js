// events.js

// Event Handlers

function handleKeyPress(event) {
    if (finalResults.classList.contains('hidden')) {
        const typedChar = event.key;
        totalCharsTyped++;

        const expectedChar = characters[currentCharIndex];

        if (expectedChar === "Space" && typedChar === ' ') {
            correctCharsTyped++;
            userInputLabel.innerText = '[Space]';
            displayNextCharacter();
        } else if (typedChar === expectedChar) {
            correctCharsTyped++;
            userInputLabel.innerText = typedChar;
            displayNextCharacter();
        } else {
            // Incorrect character
            userInputLabel.innerText = typedChar === ' ' ? '[Space]' : typedChar;
            flashRed(userInputLabel);
            incorrectChars.push(typedChar === ' ' ? '[Space]' : typedChar);
            updateIncorrectLettersPane();
        }

        updateFeedback();
    }
}

function handleRestart() {
    startTest();
}
