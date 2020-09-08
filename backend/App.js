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


//Move to APIManager
app.post("/rest/products", async (req, res) => {
      console.log(req.body);
      const values = {
        id: req.body.id,
        name: req.body.name,
        storeId: req.body.storeId,
        category: req.body.category,
        brand: req.body.brand,
        photoUrl: req.body.photoUrl,
        isEco: req.body.isEco,
        unit: req.body.unit,
        pricePerUnit: req.body.pricePerUnit,
        pricePerItem: req.body.pricePerItem,
        country: req.body.country,
        url: req.body.url,
        modifyDate: req.body.modifyDate,
      };
      try {
        await con.query("INSERT INTO product SET ?", values);
        res.json({ message: "success!" });
      } catch (e) {
        res.json({ message: "failed" });
      }
    });

     app.get("/rest/products", async (req, res) => {
       con.query("SELECT * FROM product", (err, rows, fields) => {
         if (!err) {
           res.send(rows);
         } else {
           console.log(err);
         }
       });
     });
  
     app.delete("/rest/products", async (req, res) => {
        con.query("DELETE FROM product", (err, rows, fields) => {
         if (!err) {
           res.send(rows);
         } else {
           console.log(err);
         }

     })
    });


 
