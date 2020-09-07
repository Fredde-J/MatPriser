const express = require('express')
const app = express()
const port = 3000

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World! From Express!')
})

const TestHarvesting = require("./Harvesters/MainHarvesterFactory");
const APIManager = require("./APIManager")
/* TestHarvesting.test(); */

APIManager.connectToDb();

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


app.get("/rest/categories", async (req, res) => {
  con.query("SELECT * FROM category", (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  
  });
});

app.get("/rest/stores", async (req, res) => {
  con.query("SELECT * FROM store", (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
});

 
