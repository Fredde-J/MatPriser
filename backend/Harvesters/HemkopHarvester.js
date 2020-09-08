const fetch = require('node-fetch');
    
// Coop codes å,ä,ä,& etc using special html encoding
// this library converts to utf-8/normal encoding...
module.exports = class HemkopHarvester {
    static bustCache() {
        return "?avoidCache=" + (Math.random() + "").split(".")[1];
      }

    static async getProducts(categoryURL) {
        // categoryURL: tex  Frukt-och-gront/Frukt/Applen
        //https://www.hemkop.se/c/Frukt-och-gront/Frukt/Bananer?avoidCache=1599484964743&size=12
        let raw = await fetch('https://www.hemkop.se/c/' +
        categoryURL +
        this.bustCache() +
        '&size=12'
        );
        return (await raw.json()).results;
    }

}