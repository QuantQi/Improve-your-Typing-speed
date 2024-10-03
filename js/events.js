// Event Handlers


function handleKeyPress(event) {

    // List of keys to ignore
    const ignoredKeys = [
        'CapsLock', 'Tab', 'Enter', 'Backspace', 'Delete', 'ArrowLeft', 
        'ArrowRight', 'ArrowUp', 'ArrowDown', 'Alt', 'Control', 'Meta', 
        'AltGraph', 'Escape', 'PageUp', 'PageDown', 'End', 'Home', 'Insert', 
        'Pause', 'ScrollLock', 'PrintScreen', 'NumLock', 'ContextMenu', 
        'F1', 'F2', 'Shift', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10',
        'F11', 'F12','Space','Shift'
    ];

    // Ignore if any of the specified keys are pressed
    if (ignoredKeys.includes(event.key)) {
        return;
    }

    if (finalResults.classList.contains('hidden')) {
        const typedChar = event.key;
        totalCharsTyped++;

        if (currentChar === "Space" && typedChar === ' ') {
            correctCharsTyped++;
            displayNextCharacter();
        } else if (typedChar === currentChar) {
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
