import React, {Component, useContext, useEffect, useState} from "react";
import {
  Card,
  CardText,
  CardBody,
  CardLink,
  CardTitle,
  CardSubtitle,
} from "reactstrap";

const ProductCard = (props) => {
  let imgSrc = props.url.replace("tiff", "png");
  
  return (
    <>
      <Card className="col-5 ml-4 mb-3 d-flex flex-wrap align-items-center ">
        <CardBody>
          <CardTitle>{props.name}</CardTitle>
        </CardBody>
        <img height="150vh" width="150vw" src={imgSrc} alt="Card image cap" />
      </Card>
    </>
  );

}

export default ProductCard;