    const buttons = [...document.querySelectorAll('button')];
    const gameBoard = document.querySelector('#gameBoard')
    const boardTitel = document.querySelector('h1')
const addAnswers = (data) => {

    const questBox = document.querySelector('#quest')
    questBox.innerText = data.quest;
    buttons.forEach((val, i ) => {
        val.innerText = data.answers[i]
    })
 }
const showNextQuest = () => {
fetch('/quests', {
    method : "GEt"
}).then(res => res.json())
  .then(res =>  {
    if (res.winner) {
       handleCorrect()

    }  else {
    addAnswers(res)  
}
  })
}

const handleCorrect = () => {
    gameBoard.style.display = "none"
    boardTitel.innerText = "Wygrana koniec gry"
}
const handleWrong = () => {
    gameBoard.style.display = "none"
    boardTitel.innerText = "Zła odpowiedz koniec gry"

}


showNextQuest()
const sendAnswers = (answerIndex) => {

    fetch(`/answer/${answerIndex}`, {
        method : "POST"
    }).then(res => res.json())
        .then(res =>  {
        if (res.correct) {
            showNextQuest()
        }   else {
                handleWrong()
        }  
        })
}




for ( let val of buttons) {
    val.addEventListener('click', function() {
        console.log(buttons)
        let answer = this.innerText;
        let answerIndex;
          buttons.forEach((val, i) => {
            if (val.innerText === answer) {
                answerIndex = i;
            }
        })
        sendAnswers(answerIndex)
    })
}