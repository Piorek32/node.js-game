    const buttons = [...document.querySelectorAll('.answerBtn')];
    const gameBoard = document.querySelector('#gameBoard')
    const boardTitel = document.querySelector('h1')
    const tipContent = document.querySelector('.tipContent')
    const callToAFriendBtn = document.querySelector('#callToAFriend')
    const halfOnHalfBtn = document.querySelector('#halfOnHalf')
const addAnswers = (data) => {

    const questBox = document.querySelector('#quest')
    questBox.innerText = data.quest.quest;
    buttons.forEach((val, i ) => {
        val.innerText = data.quest.answers[i]
    })
 }
const showNextQuest = () => {
    tipContent.innerText = "";
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


const handleCorrect = () => {
    gameBoard.style.display = "none"
    boardTitel.innerText = "Wygrana koniec gry"
}
const handleWrong = () => {
    gameBoard.style.display = "none"
    boardTitel.innerText = "Zła odpowiedz koniec gry"

}
const callToAFriend = () => {
    fetch('/help/friend', {
        method : "GEt"
    }).then(res => res.json())
      .then(res =>  handelCallToAFriend(res) )
      
    }

    const halfObHalf = () => {
        fetch('/help/half', {
            method : "GEt"
        }).then(res => res.json())
          .then(res =>  handelHalf(res) )
          
        }

        const handelHalf = (data) => {
            console.log(data)
            buttons.forEach(val => {
                if (val.innerText !== data.badAnswer && val.innerText !== data.goodAnswer) {
                        val.style.display = "none"
                }
            })
            
            
        }        

const handelCallToAFriend = (data) => {
    tipContent.innerText = data.goodAnswer;
    callToAFriendBtn.classList.add('disableHelpBtn')
}


callToAFriendBtn.addEventListener('click', callToAFriend)
halfOnHalfBtn.addEventListener('click', halfObHalf)