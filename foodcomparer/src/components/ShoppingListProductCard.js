import React from "react";
import { Button, ButtonGroup, Card, Col, Container, Row } from "reactstrap";
import "../css/ShoppingListProductCard.css";

const ShoppingListProductCard = (props) => {
  const imgSrc = props.product.photoUrl.replace("tiff", "png");
  const gotSale = props.product.promotionPrice ? true : false
  const storeName =
    props.product.storeId === 1
      ? "Coop"
      : props.product.storeId === 2
      ? "Hemköp"
      : props.product.storeId === 3
      ? "Willys"
      : "";
  const onAddClick = () => {
    props.handleAddClick(props.product);
  };

  const onRemoveClick = () => {
    props.handleRemoveClick(props.product);
  };

  const priceToString = (price) => {
    let stringPrice = price.toString();
    if (stringPrice.includes(".")) {
      if (stringPrice.substr(stringPrice.length - 3, 1) !== ".") {
        stringPrice = stringPrice + "0";
      }
    }
    return stringPrice.replace(".", ",");
  };

  return (
    <>
      <Card body>
        <Row>
          <Col xs="8">
            <Row>
              <Col xs="2">
                <img
                  id="product-img-icon"
                  src={imgSrc}
                  height="5vh"
                  alt="product icon"
                />
              </Col>
              <Col xs="10">
                <Row>
                  <Container>{props.product.name}</Container>{" "}
                  <Container>{storeName}</Container>{" "}
                </Row>
              </Col>
            </Row>
          </Col>
          <Col xs="2" className="d-flex align-items-center">
            <ButtonGroup size="sm">
              <Button onClick={onRemoveClick}>-</Button>
              <Button disabled>{props.product.amount}</Button>
              <Button onClick={onAddClick}>+</Button>
            </ButtonGroup>
          </Col>
          {gotSale && (
            <Col
              xs="2"
              style={{ color: 'red'}}
              className="d-flex align-items-center"
            >
              {props.product.promotionPrice} {props.product.unit}
            </Col>
          ) }
          { !gotSale &&           
          <Col
            xs="2"
            className="d-flex align-items-center"
          >
            {priceToString(props.product.pricePerItem)} {props.product.unit}
          </Col>
          }
        </Row>
      </Card>
    </>
  );
};

export default ShoppingListProductCard;
