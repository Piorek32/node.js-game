const getQuest = (app) => {
    let isGameOver = false;
    let goodAnswers = 0;
    let callToAFriend = false;
    let questionToTheCrowd = false;
    let halfOnHalf = false;




    let quests = [
    {
        quest : "najlepszy jerzyk programowania",
        answers : ["C++", "Js", "C#", "Pyton"],
        answer : 2
    },
    {
        quest : "Stolica Polski",
        answers : ["Bytom", "Warszawa", "Kraków", "Sosnowiec"],
        answer : 2
    },
    {
        quest : "Najdłuższa rzeka na śwoiecie",
        answers : ["Dunaj", "Wkra", "Amazonka", "Tamiza"],
        answer : 2
    }
]

    
app.get('/quests', (req, res) => {
    if(goodAnswers === quests.length)  {
       debugger
        res.json({
            winner : true
        })
    }  else if (isGameOver) {
        res.json({
            loser : true
        })
    }
    else {
    let quest = quests[goodAnswers]
     res.json({
         quest, 
         questsNumber : quests.length})
    }
})

app.post('/answer/:index', (req, res)=> {
    if (isGameOver) {
        res.json({
            loser : true
        })
    }
  const { index } = req.params;
  const quest = quests[goodAnswers]
    const isGoodAnswer = parseInt(index) === quest.answer ? true : false
  if (isGoodAnswer) {
      goodAnswers++;
        res.json({
            correct : true
        })
  } else {
      isGameOver = true
    res.json({
        correct : false
    }) 
  }
})

app.get('/help/friend', (req, res) => {
    let quest = quests[goodAnswers]
    let goodAnswer = quest.answers[quest.answer]
        res.json({
            goodAnswer
        })   
        })


app.get('/help/half', (req, res) => {
    let quest = quests[goodAnswers]
    let goodAnswer = quest.answers[quest.answer]
    let badAnswersTab = quest.answers.filter(val => {
        return val !== goodAnswer
    })
     let badAnswer = badAnswersTab[Math.floor(Math.random() * 3)]
        res.json({
            badAnswer, goodAnswer
        })   
        })

app.get('/help/crowd', (req, res) => {
    let charts = [10, 20, 30, 40 ]
    for ( let i = charts.length -1; i>0; i--) {

 let channge = Math.floor(Math.random()  * 20 -10)
 charts[i] += channge;
 charts[i -1]-= channge;
       
    }
        res.json({
            charts
        })   
        })

}

module.exports = getQuest;