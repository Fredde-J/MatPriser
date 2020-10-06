import React from "react";
import { Button, ButtonGroup, Card, Col, Container, Row } from "reactstrap";

const ShoppingListProductCard = (props) => {
  const onAddClick = () => {
    props.handleAddClick(props.product);
  };

  const onRemoveClick = () => {
    props.handleRemoveClick(props.product)
  }

  return (
    <>
      <Card body>
        <Row>
          <Col xs="8">
            <Container>
              <Row>{props.product.name}</Row>
              <Row>{props.product.brand}</Row>
            </Container>
          </Col>
          <Col xs="2">
            <ButtonGroup size="sm">
              <Button onClick={onAddClick}>+</Button>
              <Button disabled>{props.product.amount}</Button>
              <Button onClick={onRemoveClick}>-</Button>
            </ButtonGroup>
          </Col>
          <Col xs="2" style={{ color: true ? "red" : null }}>
            {props.product.pricePerItem} kr
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default ShoppingListProductCard;
