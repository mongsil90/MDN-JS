// ==== 요소 선택 ====
const startForm = document.querySelector(".startForm");
const headCount = document.querySelector(".headCount");

const wordGameForm = document.querySelector(".wordGameForm");
const wordInput = document.querySelector(".wordInput");
const wordSubmit = document.querySelector(".wordSubmit");

const users = document.querySelector(".users");
const userNumber = document.querySelector(".userNumber");
const lastWords = document.querySelector(".lastWords");
const gameOver = document.querySelector(".gameOver");

// ==== reset 버튼 생성 ====
let resetButton = document.querySelector("button.reset");
if (!resetButton) {
    resetButton = document.createElement("button");
    resetButton.className = "reset hidden";
    resetButton.textContent = "Reset Game 🚀";
    document.body.append(resetButton);
    resetButton.addEventListener("click", resetGame);
}

headCount.focus();


// ==== 상태 통합 object ====
const state = { 
    players: 0,     // 참가자 수
    turn: 1,        // 현재 차례
    words: [],      // 저장된 단어 목록
    prev: null,     // 이전 단어
    over: false     // 게임 종료 여부
};


// ==== 표시/숨김 유틸 ====
function show(el) { if (el) el.classList.remove("hidden") };
function hide(el) { if (el) el.classList.add("hidden") };


// ==== 화면 랜더 전용 함수 ====
// 참가 인원
function renderUsers() {
    users.textContent = state.players ? `참가자: ${state.players}명` : "";
}

// 참가자 순서
function renderTurn() {
    userNumber.textContent = `[ ${state.turn} ] 번 참가자의 순서입니다.`;
}

// 단어 입력 후 꺽쇠 표시 추가
function appendWordToList(w) {
    lastWords.textContent += `${w} > `;
}

// 게임 종료 시 화면 표시
function endGameUI(msg) {
    state.over = true;
    gameOver.textContent = msg;
    wordInput.disabled = true;
    wordSubmit.disabled = true;
    show(resetButton);
}

// UI 초기화
function clearUI() {
    headCount.value = "";
    wordInput.value = "";
    lastWords.textContent = "";
    gameOver.textContent = "";
    users.textContent = "";
    userNumber.textContent = "";
    wordInput.disabled = false;
}


// ==== 순수 로직 함수 ====
function validateWord(prev, curr, seen) {
    if (!curr || curr.length !==3) return "3글자 단어가 아닙니다!";
    if (seen.has(curr)) return "중복된 단어입니다!";
    if (prev && prev.at(-1) !== curr.at(0)) return "잘못된 단어입니다!";
    return null; // 유효(올바른 단어)
}

// 마지막 player에서 첫 순서로 리턴
function nextTurn() {
    state.turn += 1;
    if (state.turn > state.players) state.turn = 1;
}


// ==== 소프트 리셋 ====
function resetGame() {
    // 상태 초기화
    state.players = 0;
    state.turn = 1;
    state.prev = null;
    state.words = [];
    state.over = false;

    // 화면 초기화
    clearUI();
    hide(wordGameForm);
    show(startForm);
    hide(resetButton);
    
    headCount.focus();
}


// ==== 이벤트 핸들러 ====
// 참가 인원 입력 시 작동
startForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const n = Number(headCount.value);
    if (!Number.isInteger(n) || n < 1) {
        alert("1명 이상의 인원 수를 숫자로 입력하세요!");
        headCount.focus();
         headCount.select?.();
        return;
    }

    state.players = n;
    renderUsers();
    renderTurn();

    hide(startForm);
    show(wordGameForm);
    wordInput.disabled = false;
    wordInput.focus();
});

// 단어 제출 시 작동
wordGameForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (state.over) return;

    const curr = wordInput.value.trim();
    const err = validateWord(state.prev, curr, new Set(state.words));

    if (err) {
        endGameUI(`${err} [ ${state.turn} ] 번 참가자 탈락!`);
        return;         // 실패 시 아래 로직 실행 금지
    }

    // 성공 경로: 상태 갱신 -> 화면 갱신 -> 턴 전진
    state.words.push(curr);
    state.prev = curr;

    appendWordToList(curr);
    wordInput.value = "";

    nextTurn();
    renderTurn();
});


// ==== 리셋 버튼 클릭 ====
resetButton.addEventListener("click", resetGame);


// 초기 포커스
headCount.focus();
