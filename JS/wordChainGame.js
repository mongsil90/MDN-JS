// 인원 수 요소 가져오기
const startForm = document.querySelector(".startForm");
const headCount = document.querySelector(".headCount");
const startButton = document.querySelector(".startButton");
const userNumber = document.querySelector(".userNumber");
const users = document.querySelector(".users");

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
    wordInput.disabled = true;
    wordSubmit.disabled = true;
    userNumber.remove();

    resetButton = document.createElement("button");
    resetButton.textContent = "Reset Game 🚀";
    document.body.append(resetButton);
    resetButton.addEventListener("click", (event) => {
        location.reload();
    });
}


// 단어 판별 함수
function checkWord() {

    const checkRep = words.find((word) => word === newWord);

    if (newWord.length !== 3) {
        gameOver.textContent = `3글자 단어가 아닙니다! [${startCount}] 번 참가자 탈락!`;
        resetBtn();

    } else if (checkRep) {
        gameOver.textContent = `중복된 단어입니다! [${startCount}] 번 참가자 탈락!`;
        resetBtn();
        
    } else if (pastWord.at(-1) !== newWord.at(0)) {
        gameOver.textContent = `잘못된 단어입니다! [${startCount}] 번 참가자 탈락!`;
        resetBtn();
    }
}


// 단어 입력 시 몇 번째 차례인지 알려주는 함수

function setUsercount() {

    // 1번 순서이면 단어 저장
    if (!newWord) {
        newWord = wordInput.value;
        words.push(newWord);

        if (newWord.length !== 3) {
            gameOver.textContent = `3글자 단어가 아닙니다! [${startCount}] 번 참가자 탈락!`;
            resetBtn();
        }

    // 1번 이후 단어 저장
    } else {
        pastWord = newWord;
        newWord = wordInput.value;
        checkWord();
        words.push(newWord);
    } 

    lastWords.textContent += wordInput.value + " > ";
    wordInput.value = "";

    // 숫서 리셋 조건문
    startCount++
    const userCount = Number(headCount.value);
    if (startCount > userCount) {
        startCount = 1;
    }
    userNumber.textContent = `[ ${startCount} ] 번 참가자의 순서입니다!`;
}


// 콜백: 게임 시작 함수
function startGame(e) {
    e.preventDefault();

    if (Number(headCount.value) === 0) {
        alert("1명 이상의 인원 수를 숫자로 입력하세요!");
        location.reload();
    }
    
    startForm.style.display = "none";
    wordGameForm.classList.toggle("show");
    users.textContent = `참가자: ${headCount.value}명`;
    userNumber.textContent = `[ ${startCount} ] 번 참가자의 순서입니다!`;
    wordSubmit.addEventListener("click", setUsercount);
    wordInput.focus();
    
}


// 이벤트 리스너: 게임 시작
startButton.addEventListener("click", startGame);