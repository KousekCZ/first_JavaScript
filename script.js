let randomNumber = Math.floor(Math.random() * 100) + 1;
const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');
let guessCount = 1;
let resetButton;

function checkGuess() {
    const userGuess = Number(guessField.value);
    if (guessCount === 1) {
        guesses.textContent = 'Předchozí pokusy: ';
    }

    guesses.textContent += userGuess + ', ';

    if (userGuess === randomNumber) {
        lastResult.textContent = 'Výborně, uhodl/a jsi číslo.';
        lowOrHi.style.backgroundColor = 'grey';
        lastResult.style.backgroundColor = 'green';
        lowOrHi.textContent = '';
        setGameOver();
    } else if (guessCount === 10) {
        lastResult.textContent = '! Došly ti pokusy, prohrál/a jsi.!';
        lowOrHi.textContent = '';
        guesses.textContent = 'Bylo to číslo: ' + randomNumber;
        setGameOver();
    } else {
        lastResult.textContent = 'Špatně, zkus jiné číslo!';
        lastResult.style.backgroundColor = '#f64a00';
        if(userGuess < randomNumber) {
            lowOrHi.textContent = 'Poslední zadaný pokus byl příliš nízko.' ;
            lowOrHi.style.backgroundColor = 'yellow';
        } else if(userGuess > randomNumber) {
            lowOrHi.textContent = 'Poslední zadaný pokus byl příliš vysoko.';
            lowOrHi.style.backgroundColor = 'yellow';
        }
    }

    guessCount++;
    guessField.value = '';
    guessField.focus();
}

guessSubmit.addEventListener('click', checkGuess);

function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement('button');
    resetButton.textContent = 'Nová hra';
    lowOrHi.style.backgroundColor = '';
    document.body.appendChild(resetButton);
    resetButton.addEventListener('click', resetGame);
}

function resetGame() {
    guessCount = 1;
    const resetParas = document.querySelectorAll('.resultParas p');
    for (const resetPara of resetParas) {
        resetPara.textContent = '';
    }

    resetButton.parentNode.removeChild(resetButton);
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();
    lastResult.style.backgroundColor = '';
    randomNumber = Math.floor(Math.random() * 100) + 1;
}