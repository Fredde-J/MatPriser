const fetch = require("node-fetch");

module.exports = class AxfoodHarvester {
  static bustCache() {
    return "?avoidCache=" + (Math.random() + "").split(".")[1];
  }

  /*static async getCategories() {
    let raw = await fetch(
      "https://www.willys.se/leftMenu/categorytree" + this.bustCache()
    );
    return await raw.json();
  }*/

  static async getProducts(baseURL,categoryURL) {
    let raw = await fetch(
      baseURL +
      categoryURL +
      this.bustCache() +
        "&size=10000"
    );
    return (await raw.json()).results;
  }

  /*static async getAllProducts() {
    // NOT WRITTEN YET!
    let categories = await this.getCategories();
    // now loop basic categories and getProducts for each category...
    // how would you write this?
  }*/
};
