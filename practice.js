// ==== 요소 가져오기 ====
const startForm = document.querySelector(".startForm");
const startBtn = document.querySelector(".startBtn");
const playForm = document.querySelector(".playForm");
const inputNumber = document.querySelector(".inputNumber");
const submitNumber = document.querySelector(".submitNumber");
const resultEl = document.querySelector(".result");
const logEl = document.querySelector(".logEl");


// ==== 게임 리셋 ====
let resetButton;

// 리셋 버튼 생성, 콜백 함수 호출
function resetBtn() {
    resetButton = document.createElement("button"); 
    resetButton.textContent = "Reset Game!";
    document.body.append(resetButton);
    resetButton.addEventListener("click", resetGame);
}

// 게임 리셋 콜백 함수
function resetGame() {
    
    // UI 전환
    hide(resetButton);
    hide(playForm);
    show(startBtn);

    // 입력 창, 입력 버튼 활성화
    inputNumber.disabled = false;
    inputSubmit.disabled = false;
    
    // 입력 창, 출력 메시치 초기화
    inputNumber.value = "";
    resultEl.textContent = "";
    logEl.textContent = "";
}


// ==== 상태 객체 ====
const state = {
    turn: 1,
    secretNumber: [],
    history: [],
}


// ==== UI 표시/숨김 모듈 ====
function show(el) { if (el) el.classList.remove("hidden") };
function hide(el) { if (el) el.classList.add("hidden") };


// ==== 비밀 숫자 생성 ====
function setSecretNumber() {
    state.secretNumbers = []; // 초기화

    while (state.secretNumbers.length < 3) {        // 3까지 루프
        const num = Math.floor(Math.random() * 10); // 난수 생성

        if (!state.secretNumbers.includes(num)) {   // 생성한 난수가 배열에 없으면
            state.secretNumbers.push(num);          // 난수를 배열에 저장
        }
    }
    console.log(state.secretNumbers); // 디버깅용 출력
}


// ==== 입력 값 판별 ====
function matchNumber(guess) {
    // guess : [n, n, n]

    let strike = 0;     // 스트라이크 수 저장
    let ball = 0;       // 볼 수 저장

    // 0부터 2까지 1씩 증가하며 반복
    for (let i = 0; i < 3; i++) {

        // 입력 값과 비밀 숫자가 자리까지 같으면 스트라이크 +1
        if (guess[i] === state.secretNumbers[i]) {
            strike++;

        // 비밀 숫자 안에 입력 숫자가 포함되면 볼 +1
        } else if (state.secretNumbers.includes(guess[i])) {
            ball++;
        }
    }

    // 스트라이크도 아니고 볼도 아니면 아웃
    const out = strike === 0 && ball === 0;

    // 스트라이크, 볼, 아웃 반환
    return { strike, ball, out };
}


// ==== 입력 값이 3자리인지 확인 ====
function toDigits3(input) {
    const s = String(input).trim();         // 입력 값을 여백 없는 문자열로 저장
    if (!/^\d{3}$/.test(s)) return null;    // 정확히 숫자 3개가 아니면 null 반환

    const arr = Array.from(s, Number);      // 입력된 문자열을 숫자로 바꿔 배열에 저장

    if (new Set(arr).size !== arr.length) return null; // 중복된 숫자가 있으면 null 반환(집합에 저장해 중복을 제거하고 기존 배열과 길이 비교)
    return arr;  // 중복 없을 시 배열(검증된 3자리 숫자) 반환
}                                                      


// ==== UI 핸들러 ====
function clickPitch(e) {
    e.preventDefault();

    const verified = toDigits3(inputNumber.value);

    // 입력 값에 중복이 있다면 에러 메시지를 출력
    if (!verified) {
        inputNumber.value = "";
        resultEl.textContent = "중복되지 않은 3자리 숫자를 입력하세요.";
        inputNumber.focus();
        return;
    }

    // 입력 값의 판별 결과를 저장
    const { strike, ball, out } = matchNumber(verified);

    // 결과를 UI에 표시
    if (strike === 3) {

        // 메시지 출력, 입력 창/입력 버튼 비활성화
        resultEl.textContent = `승리! 3 Strike 입니다! (정답: ${state.secretNumbers.join("")})`;
        inputNumber.disabled = true;
        inputSubmit.disabled = true;

        // 리셋 버튼
        resetBtn();
        return;
    } else if (state.turn >= 9) {
        
        // 메시지 출력, 입력 창/입력 버튼 비활성화
        resultEl.textContent = "패배! 9회까지 종료되었습니다. 다시 도전하세요!";
        inputNumber.disabled = true;
        inputSubmit.disabled = true;

        // 리셋 버튼
        resetBtn();
        return;
    } else {
        resultEl.textContent = out ? "OUt" : `${strike}S, ${ball}B`;
    }

    // 지난 결과들을 누적해서 출력
    const div = document.createElement("div");
    div.textContent += `${state.turn}회: ${verified.join("")} → ${resultEl.textContent}`;
    logEl.appendChild(div);

    // 턴 추가, 입력 창 비우기 및 포커싱
    state.turn++;
    inputNumber.value = "";
    inputNumber.focuse();
}

// ==== 콜백 함수 ====
function gameStart(e) {
    e.preventDefault();

    // UI 전환
    hide(startBtn);
    show(playForm);

    state.turn = 1;         // 턴 초기화
    inputNumber.focus();    // 입력 창 포커싱
    setSecretNumber();      // 비밀 숫자 생성
}


// ==== 이벤트 리스너 ====
playForm.addEventListener("submit", clickPitch);
startForm.addEventListener("submit", gameStart);