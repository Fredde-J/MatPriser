const express = require("express");
const app = express();
const port = 4000;

//Using cors
const cors = require("cors");

app.use(express.json(), cors());
app.get("/", (req, res) => {
  res.send("Hello World! From Express!");
});

const TestHarvesting = require("./Harvesters/MainHarvesterFactory");
//const APIManager = require("./APIManager")

//APIManager.connectToDb();

let mysql = require("mysql");

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3306,
  password: "",
  database: "mat_pris",
});

con.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

app.get("/rest/products", async (req, res) => {
  console.log("get works!");
  con.query("SELECT * FROM product", (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
});

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

app.get("/test", (req, res) => {
  TestHarvesting.test()
    .then((result) => {
      res.status(300).json(result);
    })
    .then(console.log("Success!!"))
    .catch((err) => {
      console.error(err);
    });
}); //Pushed information from Willys to backend, printing Scrubbed products

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
