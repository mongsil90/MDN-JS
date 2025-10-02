const calForm = document.querySelector(".calForm");
const numberInput = document.querySelector(".numberInput");
const resultEl = document.querySelector(".resultList");
const errorEl = document.querySelector(".error");


// 1) 파싱 (음수/소수/공백 허용)
function parseExpression(str) {
    const re = /^\s*([+-]?\d*\.?\d+)\s*([+\-*/])\s*([+-]?\d*\.?\d+)\s*$/;
    const m = str.match(re);
    if (!m) return null;
    
    const a = parseFloat(m[1]);
    const op = m[2];
    const b = parseFloat(m[3]);
    if (Number.isNaN(a) || Number.isNaN(b)) return null;
    return {a, op, b};
}


// 2) 계산 함수(순수 로직)
const OPS = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => (b === 0 ? NaN : a / b),
};

function calculate(a, op, b) {
    const fn = OPS[op];
    if (!fn) return NaN;
    return fn(a, b);
}


// 3) UI 핸들러
function handleCal(e) {
    e.preventDefault();

    const inputValue = numberInput.value;
    const parsed = parseExpression(inputValue);
    if (!parsed) {
        showError("형식이 올바르지 않습니다.");
        return;
    }

    const { a, op, b } = parsed;
    const result = calculate(a, op, b);

    if (!Number.isFinite(result)) {
        showError(op === "/" && b === 0 ? "0으로 나눌 수 없습니다." : "사칙 연산만 가능합니다.");
        return numberInput.value = "";
    }

    // 입력 유지 + 결과는 별도 표시
    showResult(`${a} ${op} ${b} = ${result}`);
    numberInput.value = result;
}

function showResult(text) {
    if (resultEl) {
        const li = document.createElement("li");
        li.textContent = text;
        document.body.append(li);
    }
}

function showError(text) {
    if (errorEl) errorEl.textContent = text;
}

numberInput.focus();
calForm.addEventListener("submit", handleCal);