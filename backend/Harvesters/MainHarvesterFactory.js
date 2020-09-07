const fs = require("fs");
const WillysHarvester = require("./WillysHarvester");
const WillysScrubber = require("./WillysScrubber");

module.exports = class HarvesterFactory {
  static async createProducts(storeId, categoryURL) {
    let products;
    let scrubbedProducts;

    switch (storeId) {
      case 0:
        products = await WillysHarvester.getProducts(categoryURL);
        scrubbedProducts = await WillysScrubber.scrubAll(products);
        break;
      case 1:
        break;
      case 2:
        break;
      default:
        console.error(
          "Out of bounds! Expected storeId between 0-2, recieved ",
          storeId
        );
    }

    return scrubbedProducts;
  }

  static async createCategories(store) {
    let categories;

    switch (store.id) {
      case 0:
        break;
      case 1:
        break;
      case 2:
        break;
      default:
        console.error(
          "Out of bounds! Expected storeId between o-2, recieved",
          store.id
        );
    }
  }
  //mockup
};
