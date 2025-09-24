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
let words = [];

headCount.focus();


// 리셋 버튼 생성 함수
function resetBtn() {
    resetButton = document.createElement("button");
    resetButton.textContent = "Reset Game 🚀";
    document.body.append(resetButton);
    resetButton.addEventListener("click", (event) => {
        location.reload();
    });
}

// 중복 단어 제한 함수
function checkRepWord() {
    const checkRep = words.find((word) => word === newWord);
    if (checkRep) {
        wordInput.disabled = true;
        wordSubmit.disabled = true;
        gameOver.textContent = "중복된 단어입니다!";
        resetBtn();
    }
}


// 앞 단어의 끝 글자로 시작하는 단어인가?
function testWord() {
    if (pastWord.at(-1) !== newWord.at(0)) {
        wordInput.disabled = true;
        wordSubmit.disabled = true;
        gameOver.textContent = "잘못된 단어입니다!";
        resetBtn();
    }

}

// 3글자 제한 함수
function wordLengthLimit() {
    if (newWord.length !== 3) {
        wordInput.disabled = true;
        wordSubmit.disabled = true;
        gameOver.textContent = "3글자 단어가 아닙니다!";
        resetBtn();
    }
}

// 단어 저장 함수
function savedWord() {
    
    // 만약 전 단어가 비었으면 채우기
    if (!newWord) {
        newWord = wordInput.value;
        words.push(newWord);
    } else {
        pastWord = newWord;
        newWord = wordInput.value;
        testWord();
        checkRepWord();
    } 
    wordLengthLimit();
    
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