const HarvesterFactory = require("./Harvesters/MainHarvesterFactory");

module.exports = class APIManager {
  static connectToDb() {
    var mysql = require("mysql");

    global.con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "mat_pris",
      multipleStatements: true,
      port: 3306,
    });

    con.connect((err) => {
      if (err) throw err;
      console.log("Connected!");
    });
  }
  static getProductsFromDb(res) {
    con.query(
      "SELECT * FROM product order by promotionConditionLabel IS NULL ASC, mainCategoryId, pricePerUnit",
      (err, rows, fields) => {
        if (!err) {
          res.send(rows);
        } else {
          console.log(err);
        }
      }
    );
  }

  static getProductsByMainCategoryIdFromDb(mainCategoryId, res) {
    con.query(
      "SELECT * FROM product WHERE mainCategoryId = " +
        mainCategoryId +
        " AND isActive = 1 order by promotionConditionLabel IS NULL ASC, pricePerUnit",
      (err, rows, fields) => {
        if (!err) {
          res.send(rows);
        } else {
          console.log(err);
        }
      }
    );
  }

  static getCountriesByMainCategoryIdFromDb(mainCategoryId, res) {
    con.query(
      "SELECT distinct country FROM product WHERE mainCategoryId = " +
        mainCategoryId +
        " AND isActive = 1 AND isCountry = 1 order by country",
      (err, rows, fields) => {
        if (!err) {
          res.send(rows);
        } else {
          console.log(err);
        }
      }
    );
  }

  static getProductsBySearchText(text, res) {
    var clearName = text.toUpperCase().trim().replace('-',' ');
    con.query(
      "SELECT product.*, maincategory.name mainCategoryName " +
        "FROM product, maincategory " +
        "where product.mainCategoryId = maincategory.id " +
        " and BINARY UPPER(product.name) like ? "+
        " and product.isActive = 1 " +
        " order by CASE " +
        " WHEN product.name LIKE ? THEN 1 " +
        " WHEN product.name LIKE ? THEN 3 " +
        " ELSE 2 " +
        " END ",
        [ '%'+clearName+'%',clearName+'%','%'+clearName  ],
      (err, rows, fields) => {
        if (!err) {
          res.send(rows);
        } else {
          console.log(err);
        }
      }
    );
  }

  static getProductsBySearchTextAndMainCatId(text, mainCategoryId, res) {
    var clearName = text.toUpperCase().trim().replace('-',' ');
    con.query(
      "SELECT product.*, maincategory.name mainCategoryName, subcategory.name subCategoryName  " +
        "FROM maincategory, product " +
        " LEFT JOIN subcategory ON product.subCategoryId = subcategory.id " +
        "where product.mainCategoryId = maincategory.id " +
        "and maincategory.id = " +
        mainCategoryId +
        " " +
        " and product.name like  ? " +
        " and product.isActive = 1 " +
        " order by CASE " +
        " WHEN product.name LIKE ? THEN 1 " +
        " WHEN product.name LIKE ? THEN 3 " +
        " ELSE 2 " +
        " END ",
        [ '%'+clearName+'%',clearName+'%','%'+clearName  ],
      (err, rows, fields) => {
        if (!err) {
          res.send(rows);
        } else {
          console.log(err);
        }
      }
    );
  }

  static getProductsBySearchTextAndSubCatId(text, subCategoryId, res) {
    var clearName = text.toUpperCase().trim().replace('-',' ');
    con.query(
      "SELECT product.*, subcategory.name subCategoryName " +
        "FROM product, subcategory " +
        "where product.subCategoryId = subcategory.id " +
        "and subcategory.id = " +
        subCategoryId +
        " " +
        " and product.name like  ? " +
        " and product.isActive = 1" +
        " order by CASE " +
        " WHEN product.name LIKE ? THEN 1 " +
        " WHEN product.name LIKE ? THEN 3 " +
        " ELSE 2 " +
        " END ",
        [ '%'+clearName+'%',clearName+'%','%'+clearName  ],
      (err, rows, fields) => {
        if (!err) {
          res.send(rows);
        } else {
          console.log(err);
        }
      }
    );
  }

  static getMainCategories(res) {
    con.query(
      "SELECT * FROM maincategory order by name",
      (err, rows, fields) => {
        if (!err) {
          res.send(rows);
        } else {
          console.log(err);
        }
      }
    );
  }

  static getAllSubCategoriesByMainCategoryId(maincategoryId, res) {
    con.query(
      "SELECT * FROM subcategory where mainCategoryId = " +
        maincategoryId +
        " order by name",
      (err, rows, fields) => {
        if (!err) {
          res.send(rows);
        } else {
          console.log(err);
        }
      }
    );
  }

  static async getMainCategoriesUrlByStoreId(storeID, callback) {
    con.query(
      "SELECT mainCategoryId, categoryURL FROM storecategoryurl where storeID =" +
        storeID +
        " order by mainCategoryId",
      function (err, result, fields) {
        if (err) callback(err, null);
        else callback(null, result);
      }
    );
  }

  static async getStores(callback) {
    con.query("SELECT id, baseURL FROM store", (err, result, fields) => {
      if (err) callback(err, null);
      else callback(null, result);
    });
  }

  static async getCountries(callback) {
    con.query(
      "SELECT name, nameEng FROM country order by name",
      (err, result, fields) => {
        if (err) callback(err, null);
        else callback(null, result);
      }
    );
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
    "INSERT INTO `product`(name, storeId, mainCategoryId, brand, photoUrl, isEco, compareUnit, unit, pricePerUnit, pricePerItem, country, url, modifyDate, articleNumber, promotionConditionLabel, promotionType, promotionPrice) VALUES ?";

    con.query(mysqlQuery, [jsonArray], (err, results, fields) => {
      if (err) {
        return console.error(err.message);
      } else {
        console.log(
          "storeId: " + storeId + " categoryId: " + mainCategoryId + " succes!"
        );
        this.deleteProductsByMainCategoryId(storeId, mainCategoryId);
        this.updateProductsStatusByMainCategoryId(storeId, mainCategoryId);
        this.updateProductsSubCategoryId(storeId, mainCategoryId);
        this.updateProductsIsCountry(storeId, mainCategoryId);
      }
    });
  }

  static getProductsByMainCategoryIdNotSubCategoryId(
    storeId,
    mainCategoryId,
    callback
  ) {
    con.query(
      "SELECT id, name FROM product where storeId = " +
        storeId +
        " AND mainCategoryId = " +
        mainCategoryId +
        " AND subCategoryId is null order by id",
      (err, result, fields) => {
        if (err) callback(err, null);
        else callback(null, result);
      }
    );
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

  static async getProductById(productId, callback) {
    con.query("SELECT * FROM product WHERE id = " + productId +" ", (err, result, fields) => {
      if (err) callback(err, null);
      else callback(null, result);
    });
  }

  static getSimilarProductsbyId(productId, res) {
    con.query("SELECT * FROM product WHERE id = " + productId +" AND isActive = 1",
    (err, rows, fields) => {
      var storeId1 = 0;
      var storeId2 = 0;
      if (!err) {
        var storeId = rows[0].storeId;
        if(storeId == 1){
          storeId1 = 2; 
          storeId2 = 3;        
        } else if (storeId == 2){
          storeId1 = 1; 
          storeId2 = 3;
        } else{
          storeId1 = 1; 
          storeId2 = 2;
        }
        let mainCategoryId = rows[0].mainCategoryId;
        let subCategoryId = rows[0].subCategoryId;
        let name = rows[0].name;

        con.query(
          "(SELECT * "+
            "FROM product "+
            "WHERE match(name) against('"+name+"' IN BOOLEAN MODE) "+
            "AND mainCategoryId = "+mainCategoryId+" "+
            "AND storeId = "+ storeId1 +" "+
            "AND isActive = 1 "+
            "UNION "+
            "SELECT * FROM product "+
            "WHERE mainCategoryId = "+mainCategoryId+" "+
            "AND ((subCategoryId = "+subCategoryId+" AND "+subCategoryId+" IS NOT NULL) OR ("+subCategoryId+" IS NULL)) "+
            "AND storeId = "+ storeId1 +" "+
            "AND isActive = 1 "+
            "ORDER BY  match(name) against('"+name+"' IN BOOLEAN MODE) desc, pricePerUnit " +
            "LIMIT 1) "+
            "UNION "+
            "(SELECT * "+ 
            "FROM product "+ 
            "WHERE match(name) against('"+name+"' IN BOOLEAN MODE) "+
            "AND mainCategoryId = "+mainCategoryId+" "+
            "AND storeId = "+ storeId2 +" "+
            "AND isActive = 1 "+
            "UNION "+
            "SELECT * FROM product "+
            "WHERE mainCategoryId = "+mainCategoryId+" "+
            "AND ((subCategoryId = "+subCategoryId+" AND "+subCategoryId+" IS NOT NULL) OR ("+subCategoryId+" IS NULL)) "+
            "AND storeId = "+ storeId2 +" "+
            "AND isActive = 1 "+
            "ORDER BY  match(name) against('"+name+"' IN BOOLEAN MODE) desc, pricePerUnit " +
            "LIMIT 1) ",
          (err, rows, fields) => {
            if (!err) {
              /*if(rows[0] == null){
                con.query(
                  "(SELECT * "+
                  "FROM product "+
                  "WHERE mainCategoryId = "+mainCategoryId+" "+
                  "AND ((subCategoryId = "+subCategoryId+" AND "+subCategoryId+" IS NOT NULL) OR ("+subCategoryId+" IS NULL)) "+
                  "AND storeId = "+ storeId1 +" "+
                  "AND isActive = 1 "+
                  "ORDER BY pricePerUnit " +
                  "LIMIT 1) "+
                  "UNION "+
                  "(SELECT * "+ 
                  "FROM product "+ 
                  "WHERE mainCategoryId = "+mainCategoryId+" "+                  
                  "AND ((subCategoryId = "+subCategoryId+" AND "+subCategoryId+" IS NOT NULL) OR ("+subCategoryId+" IS NULL)) "+
                  "AND storeId = "+ storeId2 +" "+
                  "AND isActive = 1 "+
                  "ORDER BY pricePerUnit " +
                  "LIMIT 1) ",(err, rows, fields) => {
                    if (!err) {
                      res.send(rows);
                    }
                    else {
                      console.log(err);
                    }
                  }
                )

              }else{
                res.send(rows);
              }*/
              res.send(rows);
              
            } else {
              console.log(err);
            }
          }
          )
      } else {
        console.log(err);
      }
      /*if (err) {
        console.log("ERROR : ", err);
      } else {
        product = data;
      }*/
     /* while(result.next()){
        var storeId = result.getInt("storeId");
        if(storeId == 1){
          storeId1 = 2; 
          storeId2 = 3;        
        } else if (storeId == 2){
          storeId1 = 1; 
          storeId2 = 3;
        } else{
          storeId1 = 1; 
          storeId2 = 2;
        }
        let mainCategoryId = result.getString("mainCategoryId");
        let name = result.getString("name");
      }
      */
      /*con.query(
        "(SELECT * "+
        "FROM product "+
        "WHERE match(name) against('Ägg 20-pack' IN BOOLEAN MODE) "+
        "AND mainCategoryId = "+mainCategoryId+" "+
        "AND storeId = "+ storeId1 +" "+
        "LIMIT 1) "+
        "UNION "+
        "(SELECT * "+ 
        "FROM product "+ 
        "WHERE match(name) against('Ägg 20-pack' IN BOOLEAN MODE) "+
        "AND mainCategoryId = "+mainCategoryId+" "+
        "AND storeId = "+ storeId2 +" "+
        "LIMIT 1) ",
        (err, rows, fields) => {
          if (!err) {
            res.send(rows);
          } else {
            console.log(err);
          }
        }
      )*/
      /*con.query(
        "(SELECT * "+
        "FROM product "+
        "WHERE match(name) against('Ägg 20-pack' IN BOOLEAN MODE) "+
        "AND mainCategoryId = "+product.mainCategoryId+" "+
        "AND storeId = "+ storeId1 +" "+
        "LIMIT 1) "+
        "UNION "+
        "(SELECT * "+ 
        "FROM product "+ 
        "WHERE match(name) against('Ägg 20-pack' IN BOOLEAN MODE) "+
        "AND mainCategoryId = "+product.mainCategoryId+" "+
        "AND storeId = "+ storeId2 +" "+
        "LIMIT 1) ",
        (err, rows, fields) => {
          if (!err) {
            res.send(rows);
          } else {
            console.log(err);
          }
        }
      )*/
    
    
    });
    
    /*con.query(
      "SELECT  s.* " +
        "FROM product s JOIN product p  on p.id= " +
        productId +
        " " +
        " WHERE REPLACE(REPLACE(s.name, 'Eko', ''),'Klass 1','') like CONCAT('%',trim(REPLACE(REPLACE(p.name, 'Eko', ''),'Klass 1','')),'%') " +
        " AND s.mainCategoryId = p.mainCategoryId " +
        " AND s.storeId != p.storeId " +
        " ORDER BY storeId",
      (err, rows, fields) => {
        if (!err) {
          res.send(rows);
        } else {
          console.log(err);
        }
      }
    );*/
  }

  static deleteProductsByMainCategoryId(storeId, mainCategoryId, res) {
    con.query(
      "DELETE FROM product WHERE storeId = " +
        storeId +
        " AND mainCategoryId = " +
        mainCategoryId +
        " AND isActive = 1",
      (err) => {
        if (!err) {
          null;
        } else {
          console.log(err);
        }
      }
    );
  }

  static updateProductsIsCountry(storeId, mainCategoryId, res) {
    this.getCountries(function (err, data) {
      if (err) {
        console.log("ERROR : ", err);
      } else {
        let countries = data;
        for (let country of countries) {
          con.query(
            "UPDATE product SET isCountry = 1, country = '" +
              country.name +
              "' WHERE storeId = " +
              storeId +
              " AND mainCategoryId = " +
              mainCategoryId +
              " AND country LIKE '%" +
              country.name +
              "%' OR country LIKE '%" +
              country.nameEng +
              "%' ",
            (err) => {
              if (!err) {
                null;
              } else {
                console.log(err);
              }
            }
          );
        }
      }
    });
  }

  static updateProductsStatusByMainCategoryId(storeId, mainCategoryId, res) {
    con.query(
      "UPDATE product SET isActive = 1 WHERE storeId = " +
        storeId +
        " AND mainCategoryId = " +
        mainCategoryId +
        " ",
      (err) => {
        if (!err) {
          null;
        } else {
          console.log(err);
        }
      }
    );
  }

  static getSubCategoriesByMainCategoryId(maincategoryId, callback) {
    con.query(
      "SELECT * FROM subcategory where mainCategoryId = " +
        maincategoryId +
        " order by name",
      (err, result, fields) => {
        if (err) callback(err, null);
        else callback(null, result);
      }
    );
  }

  static updateProductsSubCategoryId(storeId, mainCategoryId) {
    this.updateProductsSubCategoryByMainCategoryId(
      storeId,
      mainCategoryId,
      function (err, data) {
        for (var p = 0; p < data.length; p++) {
          con.query(
            "UPDATE product SET subCategoryId = " +
              data[p].subCategoryId +
              " WHERE id = " +
              data[p].productId +
              "",
            function (err, result) {
              if (err) throw err;
              //console.log(result.affectedRows + " record(s) updated");
            }
          );
        }
      }
    );
  }

  static updateProductsSubCategoryByMainCategoryId(
    storeId,
    mainCategoryId,
    callback
  ) {
    var sql =
      "SELECT * FROM subcategory where mainCategoryId = ? and description is not null order by name;SELECT id, name FROM product where storeId = ? AND mainCategoryId = ? AND subCategoryId is null order by id";

    con.query(sql, [mainCategoryId, storeId, mainCategoryId], function (
      error,
      results
    ) {
      if (error) {
        throw error;
      }
      let updateProductArr = [];
      for (var i = 0; i < results[0].length; i++) {
        var subCatDescArray = results[0][i].description.split(",");
        for (var j = 0; j < subCatDescArray.length; j++) {
          for (var p = 0; p < results[1].length; p++) {
            if (
              results[1][p].name
                .toUpperCase()
                .includes(subCatDescArray[j].toUpperCase())
            ) {
              //console.log(results[1][p].id+' '+results[1][p].name);
              //console.log('***'+subCatDescArray[j]+'***');
              updateProductArr.push({
                productId: results[1][p].id,
                subCategoryId: results[0][i].id,
              });
            }
          }
        }
      }
      callback(null, updateProductArr);
    });
  }
};
