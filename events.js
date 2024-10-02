// Event Handlers

function handleKeyPress(event) {
    // Ignore if 'Shift' key is pressed
    if (event.key === 'Shift') return;

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
            
        }

        updateFeedback();
    }
}

function handleRestart() {
    clearInterval(interval);
    finishTest();
    startTest();
}
