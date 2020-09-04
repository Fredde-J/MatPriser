const fs = require("fs");
const WillysHarvester = require("./WillysHarvester");
const WillysScrubber = require("./WillysScrubber");
const CoopHarvester = require("./CoopHarvester");
const CoopScrubber = require("./CoopScrubber");

module.exports = class TestHarvesting {
  static async test() {
    // write to file for now (goal: write to DB instead)
    /*
    function writeToFile(fileName, data) {
      fs.writeFileSync(fileName, JSON.stringify(data, null, "  "), "utf-8");
    } 
    */

    let categories = await WillysHarvester.getCategories();
    let frystFagel = await WillysHarvester.getProducts(
      "Kott-chark-och-fagel/Fagel/Fryst-fagel"
      // note we can also fetch all Kott-chark-och-fagel at ONCE!
      // 'Kott-chark-och-fagel'
    );
    
    let coopBanan = await CoopHarvester.getProducts(32490);

    //writeToFile("categories.json", categories, 'utf-8');
    //writeToFile("coop.json", coopBanan, 'utf-8');

    // Test of scrubber
    /*writeToFile(
      "willys-fryst-fagel-scrubbed.json",
      await WillysScrubber.scrubAll(frystFagel)
    ); */
    //return await WillysScrubber.scrubAll(frystFagel);
    return await CoopScrubber.scrubAll(coopBanan);
  }
};
