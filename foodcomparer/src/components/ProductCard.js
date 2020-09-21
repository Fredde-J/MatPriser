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
  const [shoppingList, setShoppingList] = useState([])

  const getStoreName = () => {
    console.log(props.product.storeId);
    setStoreName(props.product.storeId);
    
  }
  const addToList = ()=>{
    console.log(props.product)
    let shoppingListFromLocalStore = localStorage.getItem("shoppingList")
    JSON.parse(shoppingListFromLocalStore)
    //shoppingListFromLocalStore.push(props.product)
    console.log(shoppingListFromLocalStore)
  }
  useEffect(() =>{
    if(localStorage.getItem("shoppingList")===null){
      let productsInList = [];
      localStorage.setItem('shoppingList', JSON.stringify(productsInList))
    }
    getStoreName();
  },[])
  return (
    <>
      <Card className="col-5 ml-4 mb-3 d-flex flex-wrap align-items-center product-card">
        <CardBody>
          <CardTitle>{props.product.name}</CardTitle>
          <CardText>{storeName}</CardText>
        </CardBody>
        <img height="150vh" width="150vw" src={imgSrc} alt="Card image cap" />
        <img src={listIcon} alt="listIcon" onClick={addToList}></img>
      </Card>
    </>
  );

}

export default ProductCard;