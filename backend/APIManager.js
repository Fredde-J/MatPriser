const HarvesterFactory = require("./Harvesters/MainHarvesterFactory");

module.exports = class APIManager {
  static connectToDb() {
    var mysql = require("mysql");

    global.con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "mat_pris",
      multipleStatements: true
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
    con.query("SELECT * FROM product WHERE mainCategoryId = "+mainCategoryId+" AND isActive = 1", (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  }

  static getProductsBySearchText(text, res){
    con.query("SELECT * FROM product where name like '%"+text+"%' and isActive = 1", (err, rows, fields) => {
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
      } else {
        console.log("storeId: "+storeId+ " categoryId: "+mainCategoryId+" succes!");
        this.deleteProductsByMainCategoryId(storeId, mainCategoryId);
        this.updateProductsStatusByMainCategoryId(storeId, mainCategoryId);        
        this.updateProductsSubCategoryId(storeId, mainCategoryId);
      }
    });
  }

  static getProductsByMainCategoryIdNotSubCategoryId(storeId, mainCategoryId, callback){
    con.query("SELECT id, name FROM product where storeId = "+storeId+" AND mainCategoryId = "+mainCategoryId+" AND subCategoryId is null order by id", (err, result, fields) => {
      if (err) 
            callback(err,null);
        else
            callback(null,result);

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

  static deleteProductsByMainCategoryId(storeId, mainCategoryId, res) {
    con.query("DELETE FROM product WHERE storeId = "+storeId+" AND mainCategoryId = "+mainCategoryId+" AND isActive = 1", (err) => {
      if (!err) {
        null;
      } else {
        console.log(err);
      }
    });
  }

  static updateProductsStatusByMainCategoryId(storeId, mainCategoryId, res) {
    con.query("UPDATE product SET isActive = 1 WHERE storeId = "+storeId+" AND mainCategoryId = "+mainCategoryId+" ", (err) => {
      if (!err) {
        null;
      } else {
        console.log(err);
      }
    });
  }

  static getSubCategoriesByMainCategoryId(maincategoryId, callback) {
    con.query("SELECT * FROM subcategory where mainCategoryId = "+maincategoryId+" order by name", (err, result, fields) => {
      if (err) 
            callback(err,null);
        else
            callback(null,result);
    });
  }

  static updateProductsSubCategoryId(storeId, mainCategoryId){
    this.updateProductsSubCategoryByMainCategoryId(storeId, mainCategoryId,function(err,data){
      for (var p = 0; p < data.length; p++) {
        con.query("UPDATE product SET subCategoryId = "+data[p].subCategoryId+" WHERE id = "+data[p].productId+"", function (err, result) {
          if (err) throw err;
          //console.log(result.affectedRows + " record(s) updated");
        });
      }
    });
  }

  static updateProductsSubCategoryByMainCategoryId(storeId, mainCategoryId, callback) {
    var sql = "SELECT * FROM subcategory where mainCategoryId = ? and description is not null order by name;SELECT id, name FROM product where storeId = ? AND mainCategoryId = ? AND subCategoryId is null order by id";
 
    con.query(sql, [mainCategoryId, storeId, mainCategoryId], function(error, results) {
        if (error) {
            throw error;
        }
        let updateProductArr=[];
        for (var i = 0; i < results[0].length; i++) {
          var subCatDescArray = results[0][i].description.split(',');  
          for (var j = 0; j < subCatDescArray.length; j++) {
           for (var p = 0; p < results[1].length; p++) {  
              if(results[1][p].name.toUpperCase().includes(subCatDescArray[j].toUpperCase())){
                //console.log(results[1][p].id+' '+results[1][p].name);
                //console.log('***'+subCatDescArray[j]+'***');
                updateProductArr.push({ "productId": results[1][p].id, "subCategoryId": results[0][i].id});
              }
            }
          }
        }
        callback(null,updateProductArr);
    }
    );   
  }

};
