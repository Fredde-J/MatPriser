const fetch = require('node-fetch');
const Scrubber = require('./Scrubber');

module.exports = class CoopScrubber extends Scrubber {

  static translateSchema = {
    name: x => x.name,
    articleNumber: x => x.code,
    brand: x => x.manufacturer,
    photoUrl: x => x.images[0].url,
    pricePerItem: x => x.price.value,
    unitVolume: x => x.packageSize,
    unitMeasurement: x => x.packageSizeUnit,
    comparePrice: x => parseFloat(x.comparisonPrice.value),
    pricePerUnit: x => x.comparisonPrice.formattedValue.replace(/[0-9\.:]/g, ''),
    isEco: x => x.name.includes('Eko'),
    Swedish: x => x.fromSweden, //manufacturer.includes('Sverige')
    country: x => x.manufacturer.replace('Kl', '').replace('1', '').replace('.','').trim(' ','')
  }

}