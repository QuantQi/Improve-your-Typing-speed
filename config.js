// config.js

// Character array
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
const topRowKeys = "1234567890qwertyuiopQWERTYUIOP!@#$%^&*()_+=-[]{}".split('');
const homeRowKeys = "asdfghjkl;ASDFGHJKL:'\"\\|".split('');
const bottomRowKeys = "zxcvbnm,./ZXCVBNM<>?`~".split('');

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
        3: "8*ik,IK<9",
        4: "(ol.OL>",
        5: "0)p;/-_=+[{]}\\|P:?'\""
    }
};

// Time limit for the test in seconds (5 minutes)
const TEST_DURATION = 300;
