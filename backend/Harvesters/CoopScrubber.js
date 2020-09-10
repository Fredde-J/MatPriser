const fetch = require('node-fetch');
const Scrubber = require('./Scrubber');

module.exports = class CoopScrubber extends Scrubber {
  //name, storeId, categoryId, brand, photoUrl, isEco, unit, pricePerUnit, pricePerItem, country, url, modifyDate, articleNumber 
  static translateSchema = {
    name: x => x.name,
    storeId: (x) => 1, // CoopStoreId
    categoryId: (x) => 2, // testvärde!
    brand: x => x.manufacturer,
    photoUrl: x => x.images[0].url,
    isEco: x => x.name.includes("Eko") ? 1: 0,
    unit: x => x.packageSizeUnit,
    pricePerUnit: x => parseFloat(x.comparisonPrice.value),
    pricePerItem: x => x.price.value,
    country: x => x.manufacturer.replace('Kl', '').replace('1', '').replace('.','').trim(' ',''),
    //unitVolume: x => x.packageSize,
    //pricePerUnit: x => x.comparisonPrice.formattedValue.replace(/[0-9\.:]/g, ''),
    //Swedish: x => x.fromSweden, //manufacturer.includes('Sverige')
    url: x => "https://www.coop.se"+x.url,        
    modifyDate: (x) => new Date(),
    articleNumber: x => x.code,
  }

}