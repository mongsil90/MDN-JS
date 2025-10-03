// 요소 가져오기
const startForm = document.querySelector(".startForm");
const startBtn = document.querySelector(".startBtn");
const playform = document.querySelector(".playForm");
const inputNumber = document.querySelector(".inputNumber");
const submitNumber = document.querySelector(".submitNumber");
const resultEl = document.querySelector(".result");


// 상태 객체
const state = {
    randomNumbers: [],
    turn: 1,
}

// 사라지고 나타나고
function show(el) { if (el) el.classList.remove("hidden") };
function hide(el) { if (el) el.classList.add("hidden") };





// 3개의 랜덤 숫자 생성 함수
function setRandomNumber() {

    while (state.randomNumbers.length < 3) {
        const num = Math.floor(Math.random() * 10);

        if (!state.randomNumbers.includes(num)) {
            state.randomNumbers.push(num);
        }
    }
    console.log(state.randomNumbers);
}


// 입력 숫자 파싱

// 입력 숫자 판별
function handleNumber() {

}


// UI 핸들러
function gameStart(e) {
    e.preventDefault();

    // 비밀 숫자 생성, 저장
    setRandomNumber();

    // UI 전환
    hide(startBtn);
    show(playform);

}



// 이벤트 리스너
startForm.addEventListener("submit", gameStart);
submitNumber.addEventListener("submit", handleNumber);
