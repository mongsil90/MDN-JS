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
//const gameOver = document.querySelector(".gameOver");

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

    resetButton = document.createElement("button");
    resetButton.textContent = "Reset Game 🚀";
    document.body.append(resetButton);
    resetButton.addEventListener("click", (event) => {
        location.reload();
    });
}


// 단어 저장 함수
function checkWord() {
    startCount++
    // 만약 전 단어가 비었으면 채우기
    if (!newWord) {
        newWord = wordInput.value;
        words.push(newWord);

        if (newWord.length !== 3) {
            userNumber.textContent = `3글자 단어가 아닙니다! [ ${startCount} ]번 참가자, 탈락!`;
            resetBtn();
        }
        
    } else {
        pastWord = newWord;
        newWord = wordInput.value;
        
        const checkRep = words.find((word) => word === newWord);
    
        if (checkRep) {
            userNumber.textContent = `중복된 단어입니다! [ ${startCount} ]번 참가자, 탈락!`;
            resetBtn();
        } else if (pastWord.at(-1) !== newWord.at(0)) {
            userNumber.textContent = `잘못된 단어입니다! [ ${startCount} ]번 참가자, 탈락!`;
            resetBtn();
        } else if (newWord.length !== 3) {
            userNumber.textContent = `3글자 단어가 아닙니다! [ ${startCount} ]번 참가자, 탈락!`;
            resetBtn();
        }
    } 
    
    
    lastWords.textContent += wordInput.value + " > ";
    wordInput.value = "";
}


// 단어 입력 시 몇 번째 차례인지 알려주는 함수
function setUsercount() {
    console.log(startCount);
    userNumber.textContent = `[ ${startCount} ] 번 참가자의 차례입니다!`;
    checkWord();
    
    
    const userCount = Number(headCount.value);
    if (startCount > userCount) {
        startCount = 1;
    }
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
    userNumber.textContent = `[ ${startCount} ] 번 참가자의 차례입니다!`;
    startCount++
    wordSubmit.addEventListener("click", setUsercount);
    wordInput.focus();
    
}


// 이벤트 리스너: 게임 시작
startButton.addEventListener("click", startGame);