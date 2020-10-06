import React, {useEffect, useState, useContext} from "react";
import { ProductContext} from "../ContextProviders/ProductContextProvider"
import '../css/ProductCardStyling.css'
import {
  Card,
  CardTitle,
  CardText
} from "reactstrap";
import willysLogo from "../images/willys.jpg";
import coopLogo from "../images/coop4.png";
import hemkopLogo from "../images/hemkop.jpg";
import { setGlobalCssModule } from "reactstrap/lib/utils";

const ProductCard = (props) => {
  const listIcon = "/images/listIcon.svg"
  const [storeName, setStoreName] = useState([]);
  const [storeLogo, setStoreLogo] = useState([]);
  const productContext = useContext(ProductContext)
  let imgSrc = props.product.photoUrl.replace("tiff", "png");
  let productUnit;
  let promotionPrice;
  let ecoText;
  let productTest;
  var pricePerItem = props.product.pricePerItem;
  var pricePerUnit = props.product.pricePerUnit;
  let productsToLs = []
  let shoppingListFromLocalStore;

  if(pricePerItem){
    pricePerItem = pricePerItem.toString();
    if(pricePerItem.includes('.')){
      if( pricePerItem.substr(pricePerItem.length-3, 1) != '.'){
        pricePerItem = pricePerItem+"0";
      }
    }
  }
  if(pricePerUnit){
    pricePerUnit = pricePerUnit.toString();
    if(pricePerUnit.includes('.')){
      if( pricePerUnit.substr(pricePerUnit.length-3, 1) != '.'){
        pricePerUnit = pricePerUnit+"0";
      }
    }
  }

  if (props.product.unit){
    productUnit = "/"+props.product.unit;
  }

  if(props.product.promotionPrice){
    promotionPrice = props.product.promotionPrice +" kr";
  }

  if(props.product.isEco === 1){
    ecoText = 'Eko';
  }

  
  

  const getStoreName = () => {
    let storeId = props.product.storeId;
    if(storeId === 1){
      setStoreName("Coop");
      setStoreLogo(coopLogo);
    }
    else if(storeId === 2){
      setStoreName("Hemköp");
      setStoreLogo(hemkopLogo);
    }    
    else if(storeId === 3){
      setStoreName("Willys");
      setStoreLogo(willysLogo);
    }

  }


  const addToList = async ()=>{
   let products = await productContext.getSimilarProducts(props.product.id);
   products.unshift(props.product)

    if(localStorage.getItem('shoppingList')===null){
      products.forEach((product)=>{
        product.amount = 1;
      })
      productsToLs.push(products)
      localStorage.setItem('shoppingList',JSON.stringify(productsToLs))
      
    }else{
      shoppingListFromLocalStore = localStorage.getItem("shoppingList")
      shoppingListFromLocalStore = JSON.parse(shoppingListFromLocalStore)
      shoppingListFromLocalStore.forEach((items)=>{
       for (let i = items.length - 1; i <= 0 ; i--) {
         if(items[i].id===products[i].id){
          items[i].amount++ 
          products.splice(i,1)
         }

       }
      })
      //console.log(productsToLs[0])
      if(products[0]!==null&&products[0]!==undefined){
      shoppingListFromLocalStore.push(productsToLs)
      }
      localStorage.setItem('shoppingList', JSON.stringify(shoppingListFromLocalStore))

      console.log(productsToLs) 
    }
     //Remove when product card is done
     let result = localStorage.getItem('shoppingList')
     console.log(JSON.parse(result))
     //
     productsToLs=[];
  }
  useEffect(() =>{
  getStoreName()
  },[])
 
  
  return (
      <Card className="product-card mr-1 ml-1 justify-content-sm-between">
        <div class="cardTop">
          <img
            class="list-icon"
            src={listIcon}
            alt="listIcon"
            onClick={addToList}
          ></img>
          <img class="storeLogo" src={storeLogo} height="50vh"></img>
        </div>
        <div class="flex mediaBox">
          <div class="cardMedia">
            <img id="product-img" src={imgSrc} alt="Card image cap" />
          </div>
        </div>
        <div class="product-desc">
          <CardTitle class="card-title">             
              {ecoText? <div class="ecoBox"><span class="eco">{ecoText}</span></div> : ''}
              {props.product.name}
              </CardTitle>
          <CardText><div class="countrylabel">{
                props.product.isCountry === 1?
                <span>Ursprungsland: {props.product.country}</span>
                : ''
              }
              {
                props.product.country === 'Sverige' ?
                <span><img src="../images/SWE.png" class="flag" height="15vh"></img></span>
                : ''
              }</div></CardText>
          <CardText class="card-text">
            <div class="flex spaceB price-div priceBox">
                <div class="flex spaceB dirCol">{pricePerItem} {props.product.unit}<br />
                <span class="littleText">Jmf-pris {pricePerUnit} {props.product.compareUnit}</span>
                </div>
                {
                props.product.promotionPrice || props.product.promotionConditionLabel ? 
                  <div class="discountPrice dirCol">
                    <div class='whiteBox littleText'>{props.product.promotionConditionLabel}</div>
                    <div>{promotionPrice}</div>
                    {props.product.promotionType === 'LOYALTY' ? 'Medlemspris' : '' }
                  </div> 
                : ''
                }
            </div>
          </CardText>
        </div>
      </Card>
  );

}

export default ProductCard;