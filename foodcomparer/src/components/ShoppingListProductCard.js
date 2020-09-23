import React from "react";
import { Button, ButtonGroup, Card, Col, Container, Row } from "reactstrap";

const ShoppingListProductCard = ({
  product: { name, brand, amount, price, onSale }, //ES6 destructuring
}) => {
  return (
    <>
      <Card body>
        <Row>
          <Col xs="8">
            <Container>
              <Row>{name}</Row>
              <Row>{brand}</Row>
            </Container>
          </Col>
          <Col xs="2">
            <ButtonGroup size="sm">
              <Button>+</Button>
              <Button disabled>{amount}</Button>
              <Button>-</Button>
            </ButtonGroup>
          </Col>
          <Col xs="2" style={{ color: onSale ? "red" : null }}>
            {price} kr
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default ShoppingListProductCard;
