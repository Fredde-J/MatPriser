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
  static getCategories(res) {
    con.query("SELECT * FROM category", (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  }
  static getStores(res) {
    con.query("SELECT * FROM store", (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  }

  static harvestProducts(req, res) {
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
        this.addProductsToDb(result);
      })
      .then(console.log("Printing products to backend using factory"))
      .catch((err) => {
        console.error(err);
      });
  }

  static addProductsToDb(products) {
    var jsonArray = products.map((el) => Object.values(el));
    var mysqlQuery =
      "INSERT INTO `product`(name, storeId, categoryId, brand, photoUrl, isEco, unit, pricePerUnit, pricePerItem, country, url, modifyDate ) VALUES ?";

    con.query(mysqlQuery, [jsonArray], (err, results, fields) => {
      if (err) {
        return console.error(err.message);
      } else console.log("succes!");
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
