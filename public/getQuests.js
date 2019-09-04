    const buttons = [...document.querySelectorAll('button')];
    const gameBoard = document.querySelector('#gameBoard')
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
       //wymazanie planszy z gra

    }  else {
    addAnswers(res)  
}
  })
}
showNextQuest()
const sendAnswers = (answerIndex) => {

    fetch(`/answer/${answerIndex}`, {
        method : "POST"
    }).then(res => res.json())
        .then(res =>  {
        if (res.correct) {
            showNextQuest()
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