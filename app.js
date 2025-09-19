// 1부터 100까지의 무작위 숫자 변수에 할당하기(0이 나올 때를 대비해서 +1)
let randomNumber = Math.floor(Math.random() * 100) + 1;

// 숫자 입력 input, 제출 버튼 가져오기
const guessSubmit = document.querySelector(".guessSubmit");     // 제출 버튼
const guessField = document.querySelector(".guessField");       // 입력 input

// 입력 후 결과 문단
const guesses = document.querySelector(".guesses");        // 입력 값을 저장하는 상수
const lastResult = document.querySelector(".lastResult");  // 지난 입력 값의 결과
const lowOrHi = document.querySelector(".lowOrHi");        // 지난 입력 값 Up / Dow


let guessCount = 1;     // 사용자가 사용한 턴 수
let resetButton;        // 초기화 버튼을 위한 변수
guessField.focus();     // 입력 칸 커서 자동 포커스


// 입력 값 판별 함수
function checkGuess() {
    // 사용자의 입력 값을 숫자형으로 변수에 저장
    const userGuess = Number(guessField.value);

    // 조건 1: 사용자가 첫번째 턴이면?
    if (guessCount === 1) {
		    // 입력 저장 값은 공백
        guesses.textContent = "Previous guesses: ";
    }
	  // 
    guesses.textContent += userGuess + " ";

    // 사용자의 입력 값이 무작위 수와 일치할 때
    if (userGuess === randomNumber) {
        lastResult.textContent = "Congratulations! You got it right!";
        lastResult.style.backgroundColor = "green";
        lowOrHi.textContent = "";
        setGameOver();

    // 사용자가 모든 턴을 사용했을 때
    } else if (guessCount === 10) {
        lastResult.textContent = "!!! GAME OVER !!!";
        lowOrHi.textContent = "";
        setGameOver();

    // 1회 ~ 9회 오답 제출 시, 결과와 힌트
    } else {
        lastResult.textContent = "Wrong!";
        lastResult.style.backgroundColor = "red";
        if (userGuess < randomNumber) {
            lowOrHi.textContent = "Last guess was too Low!";
        } else if (userGuess > randomNumber) {
            lowOrHi.textContent = "Last guess was too High!";
        }
    }

    // 사용자 입력 시
    guessCount++;           // 턴 추가
    guessField.value = "";  // 입력 창 비우기
    guessField.focus();     // 입력 창 포커스
}

// Game Over 함수
function setGameOver() {
    guessField.disabled = true;     // 입력 칸 비활성화
    guessSubmit.disabled = true;    // 제출 버튼 비활성화
    resetButton = document.createElement("button");     // 리셋 버튼 생성
    resetButton.textContent = "Start NEW GAME!";        // 리셋 버튼에 텍스트 삽입
    document.body.append(resetButton);                  // body에 리셋 버튼 추가
    resetButton.addEventListener("click", resetGame);   // 리셋 버튼 클릭 시, resetGame 함수 실행
}

// Reset Game 함수
function resetGame() {
    // 사용자의 턴을 1로 리셋
    guessCount = 1;

    // 결과 문단의 텍스트 지우기
    const resetParas = document.querySelectorAll(".resultParas p");
    for (const resetPara of resetParas) {
        resetPara.textContent = "";
    }

    // 초기화 버튼 제거
    resetButton.remove();

    guessField.disabled = false;    // 입력 칸 활성화
    guessSubmit.disabled = false;   // 제출 버튼 활성화
    guessField.value= "";           // 입력 칸 비우기
    guessField.focus();             // 입력 칸 포커스

    // 
    lastResult.style.backgroundColor  = "blue";

    // 새로운 무작위 숫자 저장
    randomNumber = Math.floor(Math.random() * 100) +1;
}

guessSubmit.addEventListener("click", checkGuess);

