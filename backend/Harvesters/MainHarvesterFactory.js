const fs = require("fs");
const AxfoodHarvester = require("./AxfoodHarvester");
const WillysScrubber = require("./WillysScrubber");
const CoopHarvester = require("./CoopHarvester");
const CoopScrubber = require("./CoopScrubber");
const HemkopScrubber = require("./HemkopScrubber");

module.exports = class HarvesterFactory {
  static async createProducts(storeId, mainCategoryId, baseURL, categoryURL) {
    let products;
    let scrubbedProducts;

    switch (storeId) {
      // 1 - coop, 2 - hemkop, 3 - willys     
      case 1:
        products = await CoopHarvester.getProducts(baseURL,categoryURL);
        scrubbedProducts = await CoopScrubber.scrubAll(mainCategoryId, products);
        break;
      case 2:
      case 3:
        products = await AxfoodHarvester.getProducts(baseURL,categoryURL);
        if(storeId == 2){
          scrubbedProducts = await HemkopScrubber.scrubAll(mainCategoryId, products);
        }
        else if(storeId == 3){
          scrubbedProducts = await WillysScrubber.scrubAll(mainCategoryId, products);
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

  //mockup
};
