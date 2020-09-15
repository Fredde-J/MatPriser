const HarvesterFactory = require("./Harvesters/MainHarvesterFactory");

module.exports = class APIManager {
  static connectToDb() {
    var mysql = require("mysql");

    global.con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "mat_pris",
    });

    con.connect((err) => {
      if (err) throw err;
      console.log("Connected!");
    });
  }
  static getProductsFromDb(res) {
    con.query("SELECT * FROM product", (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  }

  static getProductsByMainCategoryIdFromDb(mainCategoryId, res) {
    con.query("SELECT * FROM product WHERE mainCategoryId = "+mainCategoryId+" ", (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  }

  static getMainCategories(res) {
    con.query("SELECT * FROM maincategory order by name", (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  }

  static async getMainCategoriesUrlByStoreId(storeID, callback) {
    con.query("SELECT mainCategoryId, categoryURL FROM storecategoryurl where storeID ="+storeID+" AND subCategoryId is null order by mainCategoryId", function (err, result, fields) {
      if (err) 
            callback(err,null);
        else
            callback(null,result);
    });
  }
  
  static async getStores(callback) {
    con.query("SELECT id, baseURL FROM store", (err, result, fields) => {
      if (err) 
            callback(err,null);
        else
            callback(null,result);
    });
  }
/*
  static harvestProducts(storeId, mainCategoryId, baseURL, categoryURL) {
    HarvesterFactory.createProducts(storeId, mainCategoryId, baseURL, categoryURL)
      .then((result) => {
        this.addProductsToDb(storeId, result, mainCategoryId);
      })
      .then()
      .catch((err) => {
        console.error(err);
      });
  }
*/
  static addProductsToDb(storeId, products, mainCategoryId) {
    var jsonArray = products.map((el) => Object.values(el));
    var mysqlQuery =
      "INSERT INTO `product`(name, storeId, mainCategoryId, brand, photoUrl, isEco, unit, pricePerUnit, pricePerItem, country, url, modifyDate, articleNumber, promotionConditionLabel, promotionType, promotionPrice) VALUES ?";

    con.query(mysqlQuery, [jsonArray], (err, results, fields) => {
      if (err) {
        return console.error(err.message);
      } else console.log("storeId: "+storeId+ " categoryId: "+mainCategoryId+" succes!");
    });
  }

  static deleteProducts(res) {
    con.query("DELETE FROM product", (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  }
};
