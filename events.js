// events.js

// Event Handlers

function handleKeyPress(event) {
    if (finalResults.classList.contains('hidden')) {
        const typedChar = event.key;
        totalCharsTyped++;

        const expectedChar = characters[currentCharIndex];

        if (expectedChar === "Space" && typedChar === ' ') {
            correctCharsTyped++;
            displayNextCharacter();
        } else if (typedChar === expectedChar) {
            correctCharsTyped++;
            displayNextCharacter();
        } else {
            // Incorrect character
            flashRed(characterBox);
            incorrectChars.push(typedChar === ' ' ? '[Space]' : typedChar);
            updateIncorrectLettersPane();
        }

        updateFeedback();
    }
}

function handleRestart() {
    startTest();
}
