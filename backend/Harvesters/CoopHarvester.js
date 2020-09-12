const fetch = require('node-fetch');
    
// Coop codes å,ä,ä,& etc using special html encoding
// this library converts to utf-8/normal encoding...
module.exports = class CoopHarvester {

  /*static genericCoopAPIUrl = 'https://www.coop.se/ws/v2/coop/users/anonymous/' +
    'products/discover?categoryId=32490&storeId=016001' +
    '&placements=category_page.Discover&rrSessionId=1' +
    '&currentPage=0&pageSize=10000&fields=FULL';*/

  static async getProducts(baseURL, categoryURL) {
        let raw = await fetch(baseURL +
        categoryURL +
        '&storeId=016001' +
        '&placements=category_page.Discover&rrSessionId=1' +
        '&currentPage=0&pageSize=10000&fields=FULL');
        let json = await raw.json();
        let jsonprod = json["products"];
        return jsonprod;
      }

}