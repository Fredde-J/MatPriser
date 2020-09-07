const fs = require("fs");
const WillysHarvester = require("./WillysHarvester");
const WillysScrubber = require("./WillysScrubber");
const CoopHarvester = require("./CoopHarvester");
const CoopScrubber = require("./CoopScrubber");
const HemkopHarvester = require("./HemkopHarvester");
const HemkopScrubber = require("./HemkopScrubber");

module.exports = class HarvesterFactory {
  static async createProducts(storeId, categoryURL) {
    let products;
    let scrubbedProducts;

    switch (storeId) {
      // 0 - willys, 1 - coop, 2 - mathem/hemkop
      case 0:
        products = await WillysHarvester.getProducts(categoryURL);
        scrubbedProducts = await WillysScrubber.scrubAll(products);
        break;
      case 1:
        products = await CoopHarvester.getProducts(categoryURL);
        scrubbedProducts = await CoopScrubber.scrubAll(products);
        break;
      case 2:
        products = await HemkopHarvester.getProducts(categoryURL);
        scrubbedProducts = await HemkopScrubber.scrubAll(products);
        break;
      default:
        console.error(
          "Out of bounds! Expected storeId between 0-2, recieved ",
          storeId
        );
    }
    /* let coopBanan = await CoopHarvester.getProducts(32490);
    let coopFisk = await CoopHarvester.getProducts(14754); */

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
