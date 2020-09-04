const fetch = require('node-fetch');
const Scrubber = require('./Scrubber');

module.exports = class CoopScrubber extends Scrubber {

  static translateSchema = {
    name: x => x.name,
    articleNumber: x => x.code,
    brand: x => x.manufacturer,
    unitPrice: x => x.price.value,
    comparePrice: x => parseFloat(x.comparisonPrice.value)
  }

}