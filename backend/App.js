const express = require('express')
const app = express()
const port = 3000

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World! From Express!')
})

const TestHarvesting = require("./Harvesters/MainHarvesterFactory");
/* TestHarvesting.test(); */

app.get('/test', (req, res) => {
  TestHarvesting.test().then(result => {
    res.status(300).json(result);
  }).then(console.log("Success!!"))
    .catch(err => {
    console.error(err)
  })
}) //Pushed information from Willys to backend, printing Scrubbed products


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})