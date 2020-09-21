import React, {Component, useContext, useEffect, useState} from "react";
import '../css/ProductCardStyling.css'
import {
  Card,
  CardBody,
  CardTitle,
  CardText
} from "reactstrap";
import listIcon from '../images/listIcon.svg'

const ProductCard = (props) => {
  let imgSrc = props.product.photoUrl.replace("tiff", "png");
  const [storeName, setStoreName] = useState([]);

  const getStoreName = () => {
    let id = props.product.storeId;
    if(id === 1){
      setStoreName("Coop");
    }
    else if(id === 2){
      setStoreName("Hemköp");
    }    
    else if(id === 3){
      setStoreName("Willys");
    }

  }
  const addToList = ()=>{
    console.log(props.product)
    let products = [props.product]
    if(localStorage.getItem('shoppingList')===null){
      localStorage.setItem('shoppingList',JSON.stringify(products))
    }else{
      let shoppingListFromLocalStore = localStorage.getItem("shoppingList")
      shoppingListFromLocalStore = JSON.parse(shoppingListFromLocalStore)
      shoppingListFromLocalStore.push(props.product)
      localStorage.setItem('shoppingList', JSON.stringify(shoppingListFromLocalStore))
      //remove before merge
      let result = localStorage.getItem('shoppingList')
      console.log(JSON.parse(result))
      //
    }
    
  }
  useEffect(() =>{
  getStoreName()
  localStorage.clear()
  },[])
 
  
  return (
    <>
      <Card className="col-5 ml-4 mb-3 d-flex flex-wrap product-card">
        <img
          class="list-icon"
          src={listIcon}
          alt="listIcon"
          onClick={addToList}
        ></img>
          <img id="product-img" src={imgSrc} alt="Card image cap" />
        <div class="product-desc">
          <CardTitle class="card-title">{props.product.name}</CardTitle>
          <CardText class="card-text">
            <span class="store-div" id={storeName}>
              {storeName}
            </span>
            <span class="price-div">
              {props.product.pricePerItem}kr/st <br />
              {props.product.pricePerUnit}kr/{props.product.unit}
            </span>
          </CardText>
        </div>
      </Card>
    </>
  );

}

export default ProductCard;