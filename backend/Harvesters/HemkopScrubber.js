const fetch = require('node-fetch');
const Scrubber = require('./Scrubber');

module.exports = class HemkopScrubber extends Scrubber {

  static translateSchema = {
    name: x => x.name,
    articleNumber: x => x.code,
    brand: x => x.manufacturer,
    photoUrl: x => x.image.url,
    unitPrice: x => x.priceValue,
    unitVolume: x => x.packageSize,
    unitMeasurement: x => x.priceUnit,
    comparePrice: x => x.comparePrice.replace(' kr', ''),
    unit: x => x.comparePriceUnit,
    frozen: x => x => x.labels.includes('frozen'),
    isEco: x => x.labels.includes('Eko'),
    Swedish: x => x.labels.includes("swedish_flag"),
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
  }

}