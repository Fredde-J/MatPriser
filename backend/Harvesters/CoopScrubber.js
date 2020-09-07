const fetch = require('node-fetch');
const Scrubber = require('./Scrubber');

module.exports = class CoopScrubber extends Scrubber {

  static translateSchema = {
    name: x => x.name,
    articleNumber: x => x.code,
    brand: x => x.manufacturer,
    imageUrl: x => x.images[0].url,
    unitPrice: x => x.price.value,
    unitVolume: x => x.packageSize,
    unitMeasurement: x => x.packageSizeUnit,
    comparePrice: x => parseFloat(x.comparisonPrice.value),
    compareMeasurement: x => x.comparisonPrice.formattedValue.replace(/[0-9\.:]/g, ''),
    inStock: x => '',
    frozen: x => x.consumerInformationText.includes('Fryst'),
    ecological: x => x.name.includes('Eko'),
    Swedish: x => x.fromSweden, //manufacturer.includes('Sverige')
    countryOfOrigin: x => x.manufacturer.replace('Kl', '').replace('1', '').replace('.','').trim(' ','')
  }

}