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
  const [storeLogo, setStoreLogo] = useState([]);
  const productContext = useContext(ProductContext)
  let imgSrc = props.product.photoUrl.replace("tiff", "png");
  let promotionPrice;
  let ecoText;
  var pricePerItem = props.product.pricePerItem;
  var pricePerUnit = props.product.pricePerUnit;
  let productsToLs = []
  let shoppingListFromLocalStore;
  let products;

  if(pricePerItem){
    pricePerItem = pricePerItem.toString();
    if(pricePerItem.includes('.')){
      if( pricePerItem.substr(pricePerItem.length-3, 1) !== '.'){
        pricePerItem = pricePerItem+"0";
      }
    }
    pricePerItem = pricePerItem.replace('.',',');
  }
  if(pricePerUnit){
    pricePerUnit = pricePerUnit.toString();
    if(pricePerUnit.includes('.')){
      if( pricePerUnit.substr(pricePerUnit.length-3, 1) !== '.'){
        pricePerUnit = pricePerUnit+"0";
      }
    }
    pricePerUnit = pricePerUnit.replace('.',',');
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
      setStoreLogo(coopLogo);
    }
    else if(storeId === 2){
      setStoreLogo(hemkopLogo);
    }    
    else if(storeId === 3){
      setStoreLogo(willysLogo);
    }

  }


  const addToList = async ()=>{
   products = await productContext.getSimilarProducts(props.product.id);
   products.unshift(props.product)
   products.forEach((product)=>{
    product.amount = 1;
  })

    if(localStorage.getItem('shoppingList')===null){
      productsToLs.push(products)
      localStorage.setItem('shoppingList',JSON.stringify(productsToLs)) 
    }else{
      shoppingListFromLocalStore = localStorage.getItem("shoppingList")
      shoppingListFromLocalStore = JSON.parse(shoppingListFromLocalStore)
      shoppingListFromLocalStore.forEach((items)=>{
       for (let i = items.length - 1; i >= 0 ; i--) {
         for(let j = products.length - 1; j >= 0 ; j--){
          if(products[i]===undefined){
            console.log("product has been removed")
          }
          else if(items[i].id===products[j].id){
           items[i].amount++;
           products.splice(j,1)
          }
         }
         

       }
      })
      if(products[0]!==null&&products[0]!==undefined){
      shoppingListFromLocalStore.push(products)
      }
      localStorage.setItem('shoppingList', JSON.stringify(shoppingListFromLocalStore))

    }
     productsToLs=[];
  }
  useEffect(() =>{
  getStoreName()
  })
 
  
  return (
      <Card className="product-card mr-1 ml-1 justify-content-sm-between">
        <span className="cardTop">
          <img
            className="list-icon"
            src={listIcon}
            alt="listIcon"
            onClick={addToList}
          ></img>
          <img className="storeLogo" alt="Logo" src={storeLogo} height="50vh"></img>
        </span>
        <span className="flex mediaBox">
          <span className="cardMedia">
            <img id="product-img" alt={props.product.name} src={imgSrc} />
          </span>
        </span>
        <span className="product-desc">
          <CardTitle className="card-title">             
              {ecoText? <span className="ecoBox"><span className="eco">{ecoText}</span></span> : ''}
              {props.product.name}
              </CardTitle>
          <CardText><span className="countrylabel">{
                props.product.isCountry === 1?
                <span>Ursprungsland: {props.product.country}</span>
                : ''
              }
              {
                props.product.country === 'Sverige' ?
                <span><img src="../images/SWE.png" alt="Swedish flag" className="flag" height="15vh"></img></span>
                : ''
              }</span></CardText>
          <CardText className="card-text">
            <span className="flex spaceB price-div priceBox">
                <span className="flex spaceB dirCol">{pricePerItem} {props.product.unit}<br />
                <span className="littleText">Jmf-pris {pricePerUnit} {props.product.compareUnit}</span>
                </span>
                {
                props.product.promotionPrice || props.product.promotionConditionLabel ? 
                  <span className="discountPrice dirCol">
                    <span className='whiteBox littleText'>{props.product.promotionConditionLabel}</span>
                    <span>{promotionPrice}</span>
                    {props.product.promotionType === 'LOYALTY' ? 'Medlemspris' : '' }
                  </span> 
                : ''
                }
            </span>
          </CardText>
        </span>
      </Card>
  );
};

export default ProductCard;
