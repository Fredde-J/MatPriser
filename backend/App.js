const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World! From Express!");
});

const APIManager = require("./APIManager")
const HarvesterFactory = require("./Harvesters/MainHarvesterFactory");

app.get("/test:store", (req, res) => {
  res.json({
    category: req.query.category,
    random: req.query.random,
    store: req.params.store,
  });
});
APIManager.connectToDb();

app.get("/harvest/getproducts/:store", (req, res) => {
  //example http://localhost:3000/getproducts/0?category=Kott-chark-och-fagel/Fagel/Fryst-fagel - willys
  //example http://localhost:3000/getproducts/1?category=32486 - coop
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

app.get("/harvest/getcategories/:store", (req, res) => {
  if (!/^[0-2]{1}$/.test(req.params.store)) {
    //change [0-2] if you want to have more stores
    res.status(404).send(`store cannot be found: ${req.params.store}`);
    return;
  }

  let storeId = Number(req.params.store);
  HarvesterFactory.createCategories(storeId)
    .then((result) => {
      res.status(300).json(result);
    })
    .then(console.log("Printing categories to backend using factory"))
    .catch((err) => {
      console.error(err);
    });
});

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


 
