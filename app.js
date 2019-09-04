const express = require('express')
const getQuests = require('./routes/questions')


const app = express();



app.listen(3000);
app.use(express.static('public'))




app.get("/", (req,res) => {
    console.log("home")
})


// app.get('/quests', (req, res ) => {
//         let quest = quests[goodAnswers]

// res.json(quest)

// })

getQuests(app)
