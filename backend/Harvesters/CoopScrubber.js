const fetch = require('node-fetch');
const Scrubber = require('./Scrubber');

module.exports = class CoopScrubber extends Scrubber {
  //name, storeId, mainCategoryId, brand, photoUrl, isEco, unit, pricePerUnit, pricePerItem, country, url, modifyDate, articleNumber 
  static translateSchema = {
    name: x => x.name,
    storeId: (x) => 1, // CoopStoreId
    mainCategoryId: (x) => null, // testvärde!
    brand: x => x.manufacturer,
    photoUrl: x => {
      //https://res.cloudinary.com/coopsverige/image/upload/374319.png
      //https://res.cloudinary.com/coopsverige/image/upload/fl_progressive,q_90,c_lpad,g_center,h_660,w_660/374319.png
      //https://res.cloudinary.com/coopsverige/image/upload/fl_progressive,q_90,c_lpad,g_center,h_240,w_240/374319.png
      let imgURL = x.images[0].url;
      imgURL = imgURL.replace(/.tiff/g, '.png');
      var n = imgURL.search("upload");
      return imgURL.substring(0, n+6)+'/fl_progressive,q_90,c_lpad,g_center,h_240,w_240'+imgURL.substring(n+6);
    },
    isEco: x => x.name.includes("Eko") ? 1: 0,
    compareUnit: (x) => {
      let promotionComparisonPrice = x.promotionComparisonPrice ? x.promotionComparisonPrice.formattedValue : null;
      let comparisonPriceUnit = x.comparisonPrice.formattedValue;
      if(promotionComparisonPrice !== null){
        if(promotionComparisonPrice.includes("kr/kg"))
        { return 'kr/kg'; }
        else if(promotionComparisonPrice.includes("kr/g"))
        { return 'kr/g' ;}
        else if(promotionComparisonPrice.includes("kr/st") ||  x.comparisonPrice.formattedValue.includes("kr/styck") 
          || x.comparisonPrice.formattedValue.includes("kr/H87"))
        { return 'kr/st'; }
        else if(promotionComparisonPrice.includes("kr/lit"))
        { return 'kr/l'; }
      }
      if (comparisonPriceUnit.includes("/g") || comparisonPriceUnit.includes("/G") 
                  || comparisonPriceUnit.includes("/g")  ||comparisonPriceUnit.includes("/GRM") 
                  || comparisonPriceUnit.includes("gram ungefärlig vikt")){
        return 'kr/gr';
      }else if (comparisonPriceUnit.includes("/kg") || comparisonPriceUnit.includes("/KG") 
        || comparisonPriceUnit.includes("kg")){
        return 'kr/kg';
      }else if (comparisonPriceUnit.includes("/l") || comparisonPriceUnit.includes("/L") 
        || comparisonPriceUnit.includes("LTR")){
        return 'kr/l';
      }else if (comparisonPriceUnit.includes("/ml") || comparisonPriceUnit.includes("/ML") 
        || comparisonPriceUnit.includes("MLT")){
        return 'kr/ml';
      }else if (comparisonPriceUnit.includes("/H87") || comparisonPriceUnit.includes("/ST")){
        return 'kr/st';
      }
      else if (comparisonPriceUnit.includes('undefined') || comparisonPriceUnit == null) {
        return 'kr';
      }
      else{
        return 'kr/'+x.packageSizeUnit;
      }
    },
    unit: x => {
         
     /*   if (x.packageSizeUnit == " g" || x.packageSizeUnit == "G" || x.packageSizeUnit == "g" 
          ||x.packageSizeUnit == "GRM" 
          || x.packageSizeUnit == "gram ungefärlig vikt"){
          return 'gr';
        }
        else {
          return x.packageSizeUnit;
        }*/
        return 'kr/st';
    },      
    pricePerUnit: x => {
      let prCompPrice = x.promotionComparisonPrice ? x.promotionComparisonPrice.formattedValue : null;
      if(prCompPrice){
        prCompPrice = prCompPrice.replace(' kr/kg', '');
        prCompPrice = prCompPrice.replace(' kr/lit', '');
        prCompPrice = prCompPrice.trim(' ','');
        return parseFloat(prCompPrice).toFixed(2);
      }
      else{ return parseFloat(x.comparisonPrice.value).toFixed(2)}
    },
    pricePerItem: x => x.price.value,
    country: x => {
      let manufacturer = x.manufacturer ? x.manufacturer : null;
      if(manufacturer !== null ){
        manufacturer = manufacturer.replace(/Kl 1./g, '');
        manufacturer = manufacturer.replace(/Kl. 1/g, '');
        manufacturer = manufacturer.replace(/Kl1./g, '');
        manufacturer = manufacturer.trim(' ','');
      }
      return x.manufacturer ? manufacturer : null;
    },
    url: x => "https://www.coop.se"+x.url,        
    modifyDate: (x) => new Date(),
    articleNumber: x => x.code,
    promotionConditionLabel: x => {
      let promotion = x.potentialPromotions[0]; 
      return promotion ? promotion.description : null;
    },
    promotionType: x => null,
    promotionPrice: x => null,
    storeCategoryUrlId: (x) => null
  }
}