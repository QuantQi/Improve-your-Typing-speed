
//const isShiftPressed = false;

function createKeyboard(charSet,isShiftPressed,highlightChar) {
    const keyboardContainer = document.getElementById('keyboard');
    keyboardContainer.innerHTML = '';
   // const rows = getCharacterSet(true);
   
   for (const row in charSet) {
        if (charSet.hasOwnProperty(row)) {
            
            const rowDiv = document.createElement('div');
            rowDiv.className = 'keyboard-row';

            if(row == 'homeRowKeys'){
                rowDiv.style.marginLeft = '25px';
            }else if(row == 'bottomRowKeys'){
                rowDiv.style.marginLeft = '-55px';
            }else{
                rowDiv.style.marginLeft = '0px';
            }
            const selectedRow = isShiftPressed ? charSet[row].wShift : charSet[row].woShift;
            selectedRow.forEach((key, index) => {
                const keyDiv = document.createElement('div');

                keyDiv.className = 'key';
                const innertext = selectedRow[index];
                keyDiv.innerText = innertext;
                
                if (innertext === highlightChar) {
                    keyDiv.classList.add('highlight');
                }
                rowDiv.appendChild(keyDiv);
            });
            keyboardContainer.appendChild(rowDiv);
        }
    }
    // Add a row for the spacebar
    const spacebarRow = document.createElement('div');
    spacebarRow.className = 'keyboard-row';

    const spacebarKey = document.createElement('div');
    spacebarKey.className = 'key spacebar';
    spacebarKey.innerText = ' ';

    spacebarRow.appendChild(spacebarKey);
    keyboardContainer.appendChild(spacebarRow);
}
// Create the keyboard on page load
createKeyboard(keyRows_default,false,null);
