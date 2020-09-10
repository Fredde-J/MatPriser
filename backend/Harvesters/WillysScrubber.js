const fetch = require("node-fetch");
const Scrubber = require("./Scrubber");

module.exports = class WillysScrubber extends Scrubber {
  static translateSchema = {
    name: (x) => x.name,
    storeId: (x) => 3, // testvärde!
    categoryId: (x) => 2, // testvärde!
    articleNumber: (x) => x.code,
    brand: (x) => x.manufacturer,
    photoUrl: (x) => x.image && x.image.url,
    isEco: (x) => x.labels.includes("ecological") ? 1: 0,
    unit: (x) => x.comparePriceUnit,
    pricePerUnit: (x) => parseFloat(x.comparePrice.replace(/,/, ".")),
    pricePerItem: (x) => x.priceValue,
    country: async (x) => {
      // Seems we need detailed product info for this...
      // (one fetch per product - lots of extra time :( )
      // maybe ask productOwner if Swedish/non Swedish enough?
      let rawData = await fetch(
        "https://www.willys.se/axfood/rest/p/" + x.code
      );
      let data = await rawData.json();
      return data.originCountry || data.tradeItemCountryOfOrigin;
    },
    url: (x) => "-", //testvärde!
    modifyDate: (x) => '2020-01-01 00:00:01 '
  };
};
