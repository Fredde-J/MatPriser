const fetch = require('node-fetch');
    
// Coop codes å,ä,ä,& etc using special html encoding
// this library converts to utf-8/normal encoding...
module.exports = class HemkopHarvester {
    static bustCache() {
        return "?avoidCache=" + (Math.random() + "").split(".")[1];
      }

    static genericHemkopAPIUrl = 'https://www.hemkop.se/c/';

    static async getProducts(categoryURL) {
        let raw = await fetch('https://www.hemkop.se/c/Frukt-och-gront/Frukt/' +
        categoryURL +
        this.bustCache() +
        '&code=N0429&size=12'
        );
        return (await raw.json()).results;
    }

}