const express = require("express");
const app = express();
const port = 3000;
const APIManager = require("./APIManager");
const HarvesterFactory = require("./Harvesters/MainHarvesterFactory");

app.use(express.json());
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

APIManager.getStores(function(err,data){
  if (err) {
      // error handling code goes here
      console.log("ERROR : ",err);            
  } else {            
      // code to execute on data retrieval
      stores = data;
      for(let store of stores){
          //console.log(store.id);
          APIManager.getCategoriesUrlByStoreId(store.id,function(err,data){
            if (err) {
                // error handling code goes here
                console.log("ERROR : ",err);            
            } else {            
                // code to execute on data retrieval
                categories = data;
                for(let category of categories){
                    //console.log(category.categoryURL);
                    APIManager.harvestProducts(store.id, category.categoryId, category.categoryURL)
                }
            }    
          });
      }
  }    
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

/*app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post("/harvest/getproducts/:store", async (req, res) => {
  APIManager.harvestProducts(req, res);
});

app.get("/rest/products", async (req, res) => {
  APIManager.getProductsFromDb(res);
});

app.get("/rest/categories", async (req, res) => {
  APIManager.getCategories(res);
});

app.get("rest/stores", async (req, res) => {
  APIManager.getStores(res);
});

app.delete("/rest/products", async (req, res) => {
  APIManager.deleteProducts(res);
});
*/