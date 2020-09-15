module.exports = class Scrubber {
  constructor(mainCategoryId) {
    this.mainCategoryId = mainCategoryId;
  }
  // Method that scrubs a product 
  // based on the translateSchema in our subClass
  static async scrubOne(mainCategoryId,product) {
    this.mainCategoryId = mainCategoryId;
    let scrubbed = {};
    let tschema = this.translateSchema;
    for (let key in tschema) {
      let scrubFunc = tschema[key];
      scrubbed[key] = await scrubFunc(product);
    }
    return scrubbed;
  }

  // Scrub a whole array of products
  static async scrubAll(mainCategoryId, products) {
    this.mainCategoryId = mainCategoryId;
    let scrubbed = [];
    for (let product of products) {
      scrubbed.push(await this.scrubOne(mainCategoryId,product));
    }
    return scrubbed;
  }

}