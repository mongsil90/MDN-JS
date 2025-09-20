// 난수 생성
let randomNumber = Math.floor(Math.random() * 100) + 1;


// 가져오기
const guessField = document.querySelector(".guessField");
const guessSubmit = document.querySelector(".guessSubmit");

const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");

// 이용자 턴 수
let guessCount = 1;
let resetButton;

// 함수
function checkGuess(event) {
    event.preventDefault();

    const guessValue = Number(guessField.value);

    // 조건문1
    if (guessCount === 1) {
        guesses.textContent = "Previous guesses: ";
    } 
    guesses.textContent += guessValue + " ";

    // 조건문 2
    if (randomNumber === guessValue) {
        lastResult.textContent = "Congraculation!";
        lowOrHi.textContent = "";
        setGameOver();
    } else if (guessCount === 10) {
        lastResult.textContent = "Game Over..!";
        setGameOver();
    } else {
        lastResult.textContent = "Wrong!";
        if (randomNumber < guessValue) {
            lowOrHi.textContent = "Too High!";
        } else if (randomNumber > guessValue) {
            lowOrHi.textContent = "Too Low!";
        }
    }
    guessCount++;
    guessField.value = "";
}

function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;

    resetButton = document.createElement("button");
    resetButton.textContent = "Reset Game!";
    document.body.append(resetButton);
    resetButton.addEventListener("click", resetGame);
}

function resetGame() {
    guessCount = 1;

    const resetParas = document.querySelectorAll(".resultParas p");

    for (const resetPara of resetParas) {
        resetPara.textContent = "";
    }
    
    resetButton.remove();
    
    guessField.disabled = false;
    guessSubmit.disabled = false;

    guessField.value = "";
    guessField.focus();

    randomNumber = Math.floor(Math.random() * 100) + 1;
}


// event listener
guessSubmit.addEventListener("click", checkGuess);