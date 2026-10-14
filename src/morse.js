// Diccionario oficial Morse (Alfanumérico y signos comunes)
const morseMap = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..',
    '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
    '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
    '.': '.-.-.-', ',': '--..--', '?': '..--..', '/': '-..-.', ' ': '/'
};

// Invertir diccionario para decodificar de Morse a Texto
const textMap = Object.fromEntries(Object.entries(morseMap).map(([k, v]) => [v, k]));

/**
 * Traduce texto normal a código morse con validación estricta.
 */
export const translateTextToMorse = (text) => {
    const cleanText = text.toUpperCase().trim();
    if (!cleanText) throw new Error('El campo de entrada está vacío.');

    return cleanText
        .split('')
        .map(char => {
            if (morseMap[char] !== undefined) {
                return morseMap[char];
            }
            throw new Error(`Carácter no soportado: "${char}"`);
        })
        .join(' ');
};

/**
 * Traduce código morse a texto normal con validación.
 */
export const translateMorseToText = (morse) => {
    const cleanMorse = morse.trim();
    if (!cleanMorse) throw new Error('El campo de código morse está vacío.');

    // Validar que solo contenga puntos, guiones y espacios o barras diagonales
    const validMorseRegex = /^[.\-\/\s]+$/;
    if (!validMorseRegex.test(cleanMorse)) {
        throw new Error('El código Morse contiene símbolos inválidos (use solo . , - y /).');
    }

    const words = cleanMorse.split(' / ');
    return words
        .map(word => 
            word
                .split(' ')
                .map(code => {
                    if (code === '') return '';
                    if (textMap[code]) return textMap[code];
                    throw new Error(`Secuencia Morse desconocida: "${code}"`);
                })
                .join('')
        )
        .join(' ');
};