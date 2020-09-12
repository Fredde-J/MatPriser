const fs = require("fs");
const AxfoodHarvester = require("./AxfoodHarvester");
const WillysScrubber = require("./WillysScrubber");
const CoopHarvester = require("./CoopHarvester");
const CoopScrubber = require("./CoopScrubber");
const HemkopScrubber = require("./HemkopScrubber");

module.exports = class HarvesterFactory {
  static async createProducts(storeId, categoryId, baseURL, categoryURL) {
    let products;
    let scrubbedProducts;

    switch (storeId) {
      // 1 - coop, 2 - hemkop, 3 - willys     
      case 1:
        products = await CoopHarvester.getProducts(baseURL,categoryURL);
        //next step: CoopScrubber with parameters (url, categoryId)
        scrubbedProducts = await CoopScrubber.scrubAll(categoryId, products);
        break;
      case 2:
      case 3:
        products = await AxfoodHarvester.getProducts(baseURL,categoryURL);
        //next step: AxfoodScrubber with parameters (url, categoryId)
        if(storeId == 2){
          scrubbedProducts = await HemkopScrubber.scrubAll(categoryId, products); //url, categoryId
        }
        else if(storeId == 3){
          scrubbedProducts = await WillysScrubber.scrubAll(categoryId, products); //url, categoryId
        }
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
