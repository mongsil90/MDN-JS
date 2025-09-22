// 요소 가져오기
const suggestedWord = document.querySelector(".suggestedWord");
const startButton = document.querySelector(".startButton");


function startGame(event) {
    event.preventDefault();
    const startWord = suggestedWord.value;
    console.log(startWord);
}


startButton.addEventListener("click", startGame);