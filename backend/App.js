const express = require("express");
const app = express();
const port = 4000;
const APIManager = require("./APIManager");
const HarvesterFactory = require("./Harvesters/MainHarvesterFactory");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  express.json()
  next();
});
app.get("/", (req, res) => {
  res.send("Hello World! From Express!");
});

app.get("/test:store", (req, res) => {
  res.json({
    category: req.query.category,
    random: req.query.random,
    store: req.params.store,
  });
});
APIManager.connectToDb();

var schedule = require("node-schedule");
var j = schedule.scheduleJob("10 10 * * *", function () {
  //'10 * * * *' Execute a cron job when the minute is 10 (e.g. 19:10, 20:10, etc.).
  //'10 10 * * *'Execute a cron job 10:10
  APIManager.getStores(function (err, data) {
    if (err) {
      console.log("ERROR : ", err);
    } else {
      stores = data;
      for (let store of stores) {
        APIManager.getMainCategoriesUrlByStoreId(store.id, function (
          err,
          data
        ) {
          if (err) {
            console.log("ERROR : ", err);
          } else {
            categories = data;
            for (let category of categories) {
              //APIManager.harvestProducts(store.id, category.mainCategoryId, store.baseURL, category.categoryURL);
              HarvesterFactory.createProducts(
                store.id,
                category.mainCategoryId,
                store.baseURL,
                category.categoryURL
              )
                .then((result) => {
                  APIManager.addProductsToDb(
                    store.id,
                    result,
                    category.mainCategoryId
                  );
                })
                .then()
                .catch((err) => {
                  console.error(err);
                });
            }
          }
        });
      }
    }
  });
});

/*app.get("/harvest/getproducts/:store", (req, res) => {
  //example http://localhost:3000/harvest/getproducts/1?category=discover?categoryId=32408 - coop
  //example http://localhost:3000/harvest/getproducts/2?category=Brod-och-kakor/Knackebrod-och-skorpor/Knackebrod - hemköp
  //example http://localhost:3000/harvest/getproducts/3?category=Frukt-och-Gront/Gronsaker/Paprika - willys
  //store must be a number
  APIManager.harvestProducts(req, res);
});

app.get("/harvest/getcategories/:store", (req, res) => {
  if (!/^[1-3]{1}$/.test(req.params.store)) {
    //change [0-3] if you want to have more stores
    res.status(404).send(`store cannot be found: ${req.params.store}`);
    return;
  }
*/

/* let storeId = Number(req.params.store);
    HarvesterFactory.createCategories(storeId,categoryUrl)
  .then((result) => {
      res.status(300).json(result);
    })
    .then(console.log("Printing categories to backend using factory"))
    .catch((err) => {
      console.error(err);
    });
});*/

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

/*app.post("/harvest/getproducts/:store", async (req, res) => {
  APIManager.harvestProducts(req, res);
});*/

app.get("/rest/products", async (req, res) => {
  APIManager.getProductsFromDb(res);
});

app.get("/rest/productsbymaincategoryId/:mCatId", async (req, res) => {
  let mCatId = Number(req.params.mCatId);
  APIManager.getProductsByMainCategoryIdFromDb(mCatId, res);
});

app.get("/rest/productsbysearchtext/:text", async (req, res) => {
  let text = req.params.text;
  APIManager.getProductsBySearchText(text, res);
});

app.get("/rest/maincategories", async (req, res) => {
  APIManager.getMainCategories(res);
});

app.get("rest/stores", async (req, res) => {
  APIManager.getStores(res);
});

app.delete("/rest/products", async (req, res) => {
  APIManager.deleteProducts(res);
});
