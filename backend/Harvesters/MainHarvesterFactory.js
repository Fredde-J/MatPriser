const fs = require("fs");
const WillysHarvester = require("./WillysHarvester");
const WillysScrubber = require("./WillysScrubber");
const CoopHarvester = require("./CoopHarvester");
const CoopScrubber = require("./CoopScrubber");
const HemkopHarvester = require("./HemkopHarvester");
const HemkopScrubber = require("./HemkopScrubber");

module.exports = class HarvesterFactory {
  static async createProducts(storeId, categoryId, categoryURL) {
    let products;
    let scrubbedProducts;

    switch (storeId) {
      // 1 - coop, 2 - hemkop, 3 - willys     
      case 1:
        products = await CoopHarvester.getProducts(categoryURL);
        scrubbedProducts = await CoopScrubber.scrubAll(products);
        break;
      case 2:
        products = await HemkopHarvester.getProducts(categoryURL);
        scrubbedProducts = await HemkopScrubber.scrubAll(products);
        break;
      case 3:
        products = await WillysHarvester.getProducts(categoryURL);
        scrubbedProducts = await WillysScrubber.scrubAll(products);
          break;
      default:
        console.error(
          "Out of bounds! Expected storeId between 0-2, recieved ",
          storeId
        );
        return scrubbedProducts;
    }
    /* let coopBanan = await CoopHarvester.getProducts(32490);
    let coopFisk = await CoopHarvester.getProducts(14754); */

    return scrubbedProducts;
  }

  /*static async createCategories(storeId) {
    let categories;

    switch (storeId) {
      case 0:
        categories = await WillysHarvester.getCategories();
        break;
      case 1:
        break;
      case 2:
        break;
      default:
        console.error(
          "Out of bounds! Expected storeId between 0-2, recieved",
          storeId
        );
    }

    return categories;
  }*/
  //mockup
};
