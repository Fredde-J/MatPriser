const fetch = require('node-fetch');
const Scrubber = require('./Scrubber');

module.exports = class HemkopScrubber extends Scrubber {
  constructor(mainCategoryId) {
    super(mainCategoryId);
    this.mainCategoryId = mainCategoryId;
  }
//name, storeId, categoryId, brand, photoUrl, isEco, unit, pricePerUnit, pricePerItem, country, url, modifyDate, articleNumber 
  static translateSchema = {
    name: x => x.name,
    storeId: x => 2, //Hemköp StoreId
    mainCategoryId: (x) => this.mainCategoryId, // testvärde!
    brand: x => x.manufacturer,
    photoUrl: x => x.image.url,
    isEco: x => x.labels.includes("Eko") ? 1: 0,
    unit: x => x.comparePriceUnit,
    pricePerUnit: x => x.comparePrice.replace(' kr', ''),
    pricePerItem: x => x.priceValue,
    country: async (x) => {
        // Seems we need detailed product info for this...
        // (one fetch per product - lots of extra time :( )
        // maybe ask productOwner if Swedish/non Swedish enough?
        let rawData = await fetch(
          "https://www.hemkop.se/axfood/rest/p/" + x.code
        );
        let data = await rawData.json();
        return data.originCountry || data.tradeItemCountryOfOrigin;
      },
    url: (x) => "https://www.hemkop.se/produkt/"+x.name.replace(/ /g, '-')+'-'+x.code,    
    modifyDate: (x) => new Date(),
    articleNumber: x => x.code,
    promotionConditionLabel: (x) => {
      let promotion = x.potentialPromotions[0]; 
      return promotion ? promotion.conditionLabel : null;
    },
    promotionType: (x) => {
      let promotion = x.potentialPromotions[0]; 
      return promotion ? promotion.campaignType : null;
    },
    promotionPrice: (x) => {
      let promotion = x.potentialPromotions[0]; 
      return promotion ? promotion.price.value : null;
    }
  }

}