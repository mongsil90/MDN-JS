// 인원 수 요소 가져오기
const startForm = document.querySelector(".startForm");
const headCount = document.querySelector(".headCount");
const startButton = document.querySelector(".startButton");
const userNumber = document.querySelector(".userNumber");

// 단어 입력 요소 가져오기
const wordGameForm = document.querySelector(".wordGameForm");
const wordInput = document.querySelector(".wordInput");
const wordSubmit = document.querySelector(".wordSubmit");
const lastWords = document.querySelector(".lastWords");

const gameOver = document.querySelector(".gameOver");

//
let startCount = 1;
let newWord;
let pastWord;
let resetButton;

headCount.focus();


// 리셋 게임
function resetGame() {
    wordInput.disabled = false;
    wordSubmit.disabled = false;

    userNumber.textContent = "";
    lastWords.textContent = "";
    gameOver.textContent = "";

    resetButton.remove();
}

// 리셋 버튼 생성 함수
function resetBtn() {
    resetButton = document.createElement("button");
    resetButton.textContent = "Reset Game 🚀";
    document.body.append(resetButton);
    resetButton.addEventListener("click", resetGame);
}


// 단어 판별 함수
function testWord() {

    if (pastWord.at(-1) !== newWord.at(0)) {
        wordInput.disabled = true;
        wordSubmit.disabled = true;
        gameOver.textContent = "Game Over..!!";
        resetBtn();
    }
}

// 단어 저장 함수
function savedWord(e) {
    e.preventDefault();

    // 만약 전 단어가 비었으면 채우기
    if (!newWord) {
        newWord = wordInput.value;
    } else {
        pastWord = newWord;
        newWord = wordInput.value;
        testWord();
    } 

    lastWords.textContent += wordInput.value + " > ";
    wordInput.value = "";
    setUsercount();
}

// 단어 입력 시 몇 번째 차례인지 알려주는 함수
function setUsercount() {
    
    userNumber.textContent = `[ ${startCount} ] 번 참가자의 차례입니다!`;
    startCount++

    const userCount = Number(headCount.value);
    if (startCount > userCount) {
        startCount = 1;
    }
}

// 콜백: 게임 시작 함수
function startGame(e) {
    e.preventDefault();

    startForm.style.display = "none";
    wordGameForm.classList.toggle("show");
    setUsercount();
    wordSubmit.addEventListener("click", savedWord);
    wordInput.focus();
}


// 이벤트 리스너: 게임 시작
startButton.addEventListener("click", startGame);