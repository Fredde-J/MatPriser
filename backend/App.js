const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World! From Express!')
})

const TestHarvesting = require("./Harvesters/MainHarvesterFactory");
TestHarvesting.test();

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})