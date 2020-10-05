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
var j = schedule.scheduleJob("19 10 * * *", function () {
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
                category.categoryURL,
                category.id
              )
                .then((result) => {
                  APIManager.addProductsToDb(
                    store.id,
                    category.mainCategoryId,
                    category.id,
                    result
                  );
                })
                .then(                  

                )
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

app.get("/rest/countrybymaincategoryId/:mainCatId", async (req, res) => {
  let mainCatId = Number(req.params.mainCatId);
  APIManager.getCountriesByMainCategoryIdFromDb(mainCatId, res);
});
app.get("/rest/productsbysearchtext/:text", async (req, res) => {
  let text = req.params.text;
  APIManager.getProductsBySearchText(text, res);
});

app.get("/rest/productsbysearchtextmaincatid/:text/:mainCatId", async (req, res) => {
  let text = req.params.text;
  let mainCatId = req.params.mainCatId;
  APIManager.getProductsBySearchTextAndMainCatId(text, mainCatId, res);
});

app.get("/rest/productsbysearchtextsubcatid/:text/:subCatId", async (req, res) => {
  let text = req.params.text;
  let subCatId = req.params.subCatId;
  APIManager.getProductsBySearchTextAndSubCatId(text, subCatId, res);
});

app.get("/rest/maincategories", async (req, res) => {
  APIManager.getMainCategories(res);
});

pp.get("/rest/maincategoryname/:mainCategoryId", async (req, res) => {
  let mainCategoryId = Number(req.params.mainCategoryId);
  APIManager.getMainCategoryName(mainCategoryId, res);
});

app.get("/rest/subcategories/:mainCategoryId", async (req, res) => {
  let mainCategoryId = Number(req.params.mainCategoryId);
  APIManager.getAllSubCategoriesByMainCategoryId(mainCategoryId, res);
});


app.get("rest/stores", async (req, res) => {
  APIManager.getStores(res);
});

app.get("rest/storename:storeId", async (req, res) => {
  console.log("storeid", req.params.storeId)
  let storeId = Number(req.params.storeId);
  APIManager.getStoreName(storeId, res);
})

app.get("/rest/similareProductsbyId/:productId", async (req, res) => {
  let productId = Number(req.params.productId);
  APIManager.getSimilarProductsbyId(productId, res);
});