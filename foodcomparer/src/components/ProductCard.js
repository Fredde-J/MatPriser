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

const ProductCard = (props) => {
  const listIcon = "/images/listIcon.svg"
  const [storeName, setStoreName] = useState([]);
  const [storeLogo, setStoreLogo] = useState([]);
  const [productsToList, setProductsToList] = useState([])
  const productContext = useContext(ProductContext)
  let imgSrc = props.product.photoUrl.replace("tiff", "png");
  let productUnit;
  let promotionPrice;
  let ecoText;

  if (props.product.unit){
    productUnit = "/"+props.product.unit;
  }

  if(props.product.promotionPrice){
    promotionPrice = props.product.promotionPrice+" kr";
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
  const addToList = ()=>{
    console.log(props.product)

    //setProductsToList([productContext.getSimilarProductsById(props.product.id),props.product])

    if(localStorage.getItem('shoppingList')===null){
      localStorage.setItem('shoppingList',JSON.stringify(productsToList))
    }else{
      let shoppingListFromLocalStore = localStorage.getItem("shoppingList")
      shoppingListFromLocalStore = JSON.parse(shoppingListFromLocalStore)
     productsToList.forEach(product => {
      shoppingListFromLocalStore.push(product)
      });
      
      localStorage.setItem('shoppingList', JSON.stringify(shoppingListFromLocalStore))
      //Remove when product card is done
      let result = localStorage.getItem('shoppingList')
      console.log(JSON.parse(result))
      //
    }
    
  }
  useEffect(() =>{
  getStoreName()
  },[])
 
  
  return (
      <Card className="product-card">
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
          <CardTitle class="card-title">{
                props.product.country === 'Sverige' ?
                <img src="../images/SWE.png" class="flag" height="15vh"></img>
                : ''
              }              
              {ecoText? <div class="ecoBox"><span class="eco">{ecoText}</span></div> : ''}
              {props.product.name}</CardTitle>
          <CardText class="card-text">
            <div class="flex spaceB price-div priceBox">
                <div class="flex spaceB dirCol">{props.product.pricePerItem} kr{productUnit} <br />
                <span class="littleText">Jmf-pris {props.product.pricePerUnit} kr{productUnit}</span>
                </div>
                {
                props.product.promotionPrice || props.product.promotionConditionLabel ? 
                  <div class="discountPrice dirCol">
                    <div class='whiteBox littleText'>{props.product.promotionConditionLabel}</div>
                    <div>{promotionPrice}</div>
                    {props.product.promotionType === 'LOYALTY' ? 'Medlempris' : '' }
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