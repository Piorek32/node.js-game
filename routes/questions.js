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
     res.json(quest)
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
}

module.exports = getQuest;