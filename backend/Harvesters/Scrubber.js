module.exports = class Scrubber {
 
  // Method that scrubs a product 
  // based on the translateSchema in our subClass
  static async scrubOne(mainCategoryId,storeCategoryUrlId, product) {
    let scrubbed = {};
    let tschema = this.translateSchema;
    for (let key in tschema) {
      let scrubFunc = tschema[key];
      scrubbed[key] = await scrubFunc(product,mainCategoryId,storeCategoryUrlId);
    }
    scrubbed['mainCategoryId'] = mainCategoryId;
    scrubbed['storeCategoryUrlId'] = storeCategoryUrlId;
    return scrubbed;
  }

  // Scrub a whole array of products
  static async scrubAll(mainCategoryId, storeCategoryUrlId, products) {
    let scrubbed = [];
    for (let product of products) {
      scrubbed.push(await this.scrubOne(mainCategoryId,storeCategoryUrlId, product));
    }
    return scrubbed;
  }

}