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
    console.log(props.product.storeId);
    setStoreName(props.product.storeId);
    
  }
  const addToList = ()=>{
    
  }
  useEffect(() =>{
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