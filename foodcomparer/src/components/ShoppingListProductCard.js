import React from "react";
import { Button, ButtonGroup, Card, Col, Container, Row } from "reactstrap";
import "../css/ShoppingListProductCard.css";

const ShoppingListProductCard = (props) => {
  const imgSrc = props.product.photoUrl.replace("tiff", "png");
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
          <Col xs="2">
            <ButtonGroup size="sm">
              <Button onClick={onRemoveClick}>-</Button>
              <Button disabled>{props.product.amount}</Button>
              <Button onClick={onAddClick}>+</Button>
            </ButtonGroup>
          </Col>
          <Col xs="2" style={{ color: false ? "red" : null }}>
            {props.product.pricePerItem} {props.product.unit}
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default ShoppingListProductCard;
