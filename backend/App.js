const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World! From Express!");
});

const HarvesterFactory = require("./Harvesters/MainHarvesterFactory");

app.get("/test:store", (req, res) => {
  res.json({
    category: req.query.category,
    random: req.query.random,
    store: req.params.store,
  });
});

app.get("/getproducts/:store", (req, res) => {
  //example http://localhost:3000/getproducts/0?category=Kott-chark-och-fagel/Fagel/Fryst-fagel
  //store must be a number
  if (!/^[0-2]{1}$/.test(req.params.store)) {
    //change [0-2] if you want to have more stores
    res.status(404).send(`store cannot be found: ${req.params.store}`);
    return;
  }

  if (req.query.category == undefined) {
    res.status(404).send(`category cannot be found: ${req.query.category}`);
    return;
  }

  let storeId = Number(req.params.store);
  let categoryURL = req.query.category;
  HarvesterFactory.createProducts(storeId, categoryURL)
    .then((result) => {
      res.status(300).json(result);
    })
    .then(console.log("Printing products to backend using factory"))
    .catch((err) => {
      console.error(err);
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
