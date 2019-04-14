const convertModes = {
    LATIN_TO_MORSE : 'latinToMorse',
    MORSE_TO_LATIN : 'morseToLatin',
};

function latinToMorse  (value) {
    let output = '';

    if (value === '') {
        return value;
    }


    for (let i = 0; i < value.length; i++) {
        let morseCode = convertedChars[value.charAt(i).toLowerCase()];
        output += i !== 0 ? ' ' + morseCode : morseCode;
    }

    return output;
}

function morseToLatin (value) {
    let output = '';

    if (value === '') {
        return value;
    }

    let morseWords = value.split("   ");
    console.log(morseWords);
    for (let i = 0; i < morseWords.length; i++){

        let morseChars = morseWords[i].split(' ');
        for (let j=0; j<morseWords[i].length; j++){
            let latinText = getKeyByValue(convertedChars, morseChars[j]);
            output += latinText ? latinText : '';
        }
        output += ' ';

    }
    return output;
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

module.exports = {

    convertValue: function(value, convertMode) {
        switch (convertMode) {
            case convertModes.LATIN_TO_MORSE :
                return latinToMorse(value);
            case convertModes.MORSE_TO_LATIN :
                return morseToLatin(value);
        }
    }

};

convertedChars = {
    'a': '.-',
        'b': '-...',
        'c': '-.-.',
        'd': '-..',
        'e': '.',
        'f': '..-.',
        'g': '--.',
        'h': '....',
        'i': '..',
        'j': '.---',
        'k': '-.-',
        'l': '.-..',
        'm': '--',
        'n': '-.',
        'o': '---',
        'p': '.--.',
        'q': '--.-',
        'r': '.-.',
        's': '...',
        't': '-',
        'u': '..-',
        'v': '...-',
        'w': '.--',
        'x': '-..-',
        'y': '-.--',
        'z': '--..',
        '1': '.----',
        '2': '..---',
        '3': '...--',
        '4': '....-',
        '5': '.....',
        '6': '-....',
        '7': '--...',
        '8': '---..',
        '9': '----.',
        '0': '-----',
        '.': '.-.-.-',
        ',': '--..--',
        '?': '..--..',
        "'": '.----.',
        '!': '-.-.--',
        '/': '-..-.',
        '(': '-.--.',
        ')': '-.--.-',
        '&': '.-...',
        ':': '---...',
        ';': '-.-.-.',
        '=': '-...-',
        '+': '.-.-.',
        '-': '-....-',
        '_': '..--.-',
        '"': '.-..-.',
        '$': '...-..-',
        '@': '.--.-.',
        ' ': ' '
};
