import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles.css';
import Swal from 'sweetalert2';
import { translateTextToMorse, translateMorseToText } from './morse.js';

document.addEventListener('DOMContentLoaded', () => {
    const btnTextToMorse = document.getElementById('btnTextToMorse');
    const btnMorseToText = document.getElementById('btnMorseToText');
    const labelInput = document.getElementById('labelInput');
    const helpText = document.getElementById('helpText');
    const inputData = document.getElementById('inputData');
    const outputData = document.getElementById('outputData');
    const btnTranslate = document.getElementById('btnTranslate');
    const btnClear = document.getElementById('btnClear');
    const btnCopy = document.getElementById('btnCopy');

    let mode = 'textToMorse'; // 'textToMorse' o 'morseToText'

    // Cambiar entre modos de conversión
    btnTextToMorse.addEventListener('click', () => {
        mode = 'textToMorse';
        btnTextToMorse.className = 'btn btn-primary active px-4 py-2';
        btnMorseToText.className = 'btn btn-outline-primary px-4 py-2';
        labelInput.textContent = 'Texto de entrada:';
        helpText.textContent = 'Ingresa letras, números o signos de puntuación estándar.';
        inputData.placeholder = 'Escribe tu texto aquí...';
        inputData.value = '';
        outputData.value = '';
    });

    btnMorseToText.addEventListener('click', () => {
        mode = 'morseToText';
        btnMorseToText.className = 'btn btn-primary active px-4 py-2';
        btnTextToMorse.className = 'btn btn-outline-primary px-4 py-2';
        labelInput.textContent = 'Código Morse de entrada:';
        helpText.textContent = 'Usa puntos (.) y guiones (-), separa letras con espacios y palabras con /';
        inputData.placeholder = 'Ej: .-.. --- ...- . / ..-. --- .-.';
        inputData.value = '';
        outputData.value = '';
    });

    // Acción de Traducir con validación de errores
    btnTranslate.addEventListener('click', () => {
        try {
            const val = inputData.value;
            if (mode === 'textToMorse') {
                outputData.value = translateTextToMorse(val);
            } else {
                outputData.value = translateMorseToText(val);
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error de validación',
                text: error.message,
                confirmButtonColor: '#0d6efd'
            });
        }
    });

    // Limpiar campos
    btnClear.addEventListener('click', () => {
        inputData.value = '';
        outputData.value = '';
    });

    // Copiar portapapeles
    btnCopy.addEventListener('click', () => {
        if (!outputData.value) {
            Swal.fire({
                icon: 'info',
                title: 'Nada que copiar',
                text: 'El campo de resultado está vacío.',
                timer: 1500,
                showConfirmButton: false
            });
            return;
        }
        navigator.clipboard.writeText(outputData.value);
        Swal.fire({
            icon: 'success',
            title: '¡Copiado!',
            text: 'Resultado copiado al portapapeles.',
            timer: 1500,
            showConfirmButton: false
        });
    });
});