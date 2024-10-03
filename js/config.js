// config.js

var currentChar = "";

// Define rows for up and down

var keyRows_default = {
    numRowKeys: {
        woShift: "§1234567890-=".split(''),
        wShift: "±!@#$%^&*()_+".split('')
    },
    topRowKeys: {
        woShift: "qwertyuiop[]".split(''),
        wShift: "QWERTYUIOP{}".split('')
    },
    homeRowKeys: {
        woShift: "asdfghjkl;'\\".split(''),
        wShift: "ASDFGHJKL:\"|".split('')
    },
    bottomRowKeys: {
        woShift: "`zxcvbnm,./".split(''),
        wShift: "~ZXCVBNM<>?".split('')
    }
};



// Time limit for the test in seconds (5 minutes)
const TEST_DURATION = 300;


// Function to toggle the options form
function toggleConfigOptions() {
    const keyboard = document.getElementById('keyboard');
    const optionsContainer = document.getElementById('optionsContainer');
    
    // Toggle the 'hidden' class
    keyboard.classList.toggle('hidden');
    optionsContainer.classList.toggle('hidden');

}

// Toggle visibility of keyboard and options container
document.getElementById('toggleOptionsButton').addEventListener('click', () => {
    // console.log('clicked');
    toggleConfigOptions();
 });
 

function createOptionsForm() {
    const optionsContainer = document.getElementById('optionsContainer'); // Get the options container
    const optionsTitle = document.createElement('h2');
    optionsTitle.textContent = 'Options';
    optionsContainer.appendChild(optionsTitle);

    const form = document.createElement('form');
    form.id = 'keyboardConfigForm';

    const formTitle = document.createElement('h3');
    formTitle.textContent = 'Custom Key Rows:';
    form.appendChild(formTitle);

    // Check if cookies exist and update keyRows_default accordingly
    const getCookie = (name) => {
        const value = ` ${document.cookie}`;
        const parts = value.split(' ');

       // console.log('value: '+ value);
        ///console.log('parts: '+ parts);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const updateKeyRowsFromCookies = () => {
        const numRowKeysWoShift = getCookie('numRowKeysWoShift');
        const numRowKeysWShift = getCookie('numRowKeysWShift');
        const topRowKeysWoShift = getCookie('topRowKeysWoShift');
        const topRowKeysWShift = getCookie('topRowKeysWShift');
        const homeRowKeysWoShift = getCookie('homeRowKeysWoShift');
        const homeRowKeysWShift = getCookie('homeRowKeysWShift');
        const bottomRowKeysWoShift = getCookie('bottomRowKeysWoShift');
        const bottomRowKeysWShift = getCookie('bottomRowKeysWShift');

        if (numRowKeysWoShift) keyRows_default.numRowKeys.woShift = numRowKeysWoShift.split('');
        if (numRowKeysWShift) keyRows_default.numRowKeys.wShift = numRowKeysWShift.split('');
        if (topRowKeysWoShift) keyRows_default.topRowKeys.woShift = topRowKeysWoShift.split('');
        if (topRowKeysWShift) keyRows_default.topRowKeys.wShift = topRowKeysWShift.split('');
        if (homeRowKeysWoShift) keyRows_default.homeRowKeys.woShift = homeRowKeysWoShift.split('');
        if (homeRowKeysWShift) keyRows_default.homeRowKeys.wShift = homeRowKeysWShift.split('');
        if (bottomRowKeysWoShift) keyRows_default.bottomRowKeys.woShift = bottomRowKeysWoShift.split('');
        if (bottomRowKeysWShift) keyRows_default.bottomRowKeys.wShift = bottomRowKeysWShift.split('');
    };

    updateKeyRowsFromCookies();

    const keyRows = [
        { id: 'numRowKeysWoShift', label: 'Number Row (without Shift):', value: keyRows_default.numRowKeys.woShift.join('') },
        { id: 'numRowKeysWShift', label: 'Number Row (with Shift):', value: keyRows_default.numRowKeys.wShift.join('') },
        { id: 'topRowKeysWoShift', label: 'Top Row (without Shift):', value: keyRows_default.topRowKeys.woShift.join('') },
        { id: 'topRowKeysWShift', label: 'Top Row (with Shift):', value: keyRows_default.topRowKeys.wShift.join('') },
        { id: 'homeRowKeysWoShift', label: 'Home Row (without Shift):', value: keyRows_default.homeRowKeys.woShift.join('') },
        { id: 'homeRowKeysWShift', label: 'Home Row (with Shift):', value: keyRows_default.homeRowKeys.wShift.join('') },
        { id: 'bottomRowKeysWoShift', label: 'Bottom Row (without Shift):', value: keyRows_default.bottomRowKeys.woShift.join('') },
        { id: 'bottomRowKeysWShift', label: 'Bottom Row (with Shift):', value: keyRows_default.bottomRowKeys.wShift.join('') }
    ];

    keyRows.forEach(row => {
        const div = document.createElement('div');
        div.className = 'keyrows';

        const label = document.createElement('label');
        label.htmlFor = row.id;
        label.textContent = row.label;
        div.appendChild(label);

        const input = document.createElement('input');
        input.type = 'text';
        input.id = row.id;
        input.name = row.id;
        input.value = row.value;
        div.appendChild(input);

        form.appendChild(div);

       // form.appendChild(document.createElement('br'));
    });


    const resetButton = document.createElement('button');
    resetButton.type = 'button';
    resetButton.id = 'resetConfigButton';
    resetButton.textContent = 'Reset to Default';
    
    const resetButtonDiv = document.createElement('div');
    resetButtonDiv.className = 'keyrows';
    resetButtonDiv.appendChild(resetButton);
    form.appendChild(resetButtonDiv);

    const applyButton = document.createElement('button');
    applyButton.type = 'button';
    applyButton.id = 'applyConfigButton';
    applyButton.textContent = 'Apply Configuration';
    
    const applyButtonDiv = document.createElement('div');
    applyButtonDiv.className = 'keyrows';
    applyButtonDiv.appendChild(applyButton);
    form.appendChild(applyButtonDiv);

    optionsContainer.appendChild(form);

    //document.body.appendChild(optionsContainer);
}

// Call the function to create and append the options form
createOptionsForm();

// JavaScript to handle the reset of configuration
document.getElementById('resetConfigButton').addEventListener('click', () => {
    document.getElementById('numRowKeysWoShift').value = keyRows_default.numRowKeys.woShift.join('');
    document.getElementById('numRowKeysWShift').value = keyRows_default.numRowKeys.wShift.join('');
    document.getElementById('topRowKeysWoShift').value = keyRows_default.topRowKeys.woShift.join('');
    document.getElementById('topRowKeysWShift').value = keyRows_default.topRowKeys.wShift.join('');
    document.getElementById('homeRowKeysWoShift').value = keyRows_default.homeRowKeys.woShift.join('');
    document.getElementById('homeRowKeysWShift').value = keyRows_default.homeRowKeys.wShift.join('');
    document.getElementById('bottomRowKeysWoShift').value = keyRows_default.bottomRowKeys.woShift.join('');
    document.getElementById('bottomRowKeysWShift').value = keyRows_default.bottomRowKeys.wShift.join('');
});

  // JavaScript to handle the application of configuration
  document.getElementById('applyConfigButton').addEventListener('click', () => {
    keyRows_default.numRowKeys = {
        woShift: document.getElementById('numRowKeysWoShift').value.split(''),
        wShift: document.getElementById('numRowKeysWShift').value.split('')
    };

    keyRows_default.topRowKeys = {
        woShift: document.getElementById('topRowKeysWoShift').value.split(''),
        wShift: document.getElementById('topRowKeysWShift').value.split('')
    };

    keyRows_default.homeRowKeys = {
        woShift: document.getElementById('homeRowKeysWoShift').value.split(''),
        wShift: document.getElementById('homeRowKeysWShift').value.split('')
    };

    keyRows_default.bottomRowKeys = {
        woShift: document.getElementById('bottomRowKeysWoShift').value.split(''),
        wShift: document.getElementById('bottomRowKeysWShift').value.split('')
    };

    //save keyRows_default to cookies
    document.cookie = `numRowKeysWoShift=${keyRows_default.numRowKeys.woShift.join('')}`;
    document.cookie = `numRowKeysWShift=${keyRows_default.numRowKeys.wShift.join('')}`;

    document.cookie = `topRowKeysWoShift=${keyRows_default.topRowKeys.woShift.join('')}`;
    document.cookie = `topRowKeysWShift=${keyRows_default.topRowKeys.wShift.join('')}`;
    document.cookie = `homeRowKeysWoShift=${keyRows_default.homeRowKeys.woShift.join('')}`;
    document.cookie = `homeRowKeysWShift=${keyRows_default.homeRowKeys.wShift.join('')}`;
    document.cookie = `bottomRowKeysWoShift=${keyRows_default.bottomRowKeys.woShift.join('')}`;
    document.cookie = `bottomRowKeysWShift=${keyRows_default.bottomRowKeys.wShift.join('')}`;





    //toggle options form
    createKeyboard(getCharacterSet("all"),false,null);
    toggleConfigOptions();
});