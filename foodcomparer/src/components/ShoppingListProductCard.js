import React from "react";
import { Button, ButtonGroup, Card, Col, Container, Row } from "reactstrap";

const ShoppingListProductCard = (props) => {
  const onClick = () => {
    props.handleAddClick(props.product);
  };

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
              <Button onClick={onClick}>+</Button>
              <Button disabled>{props.product.amount}</Button>
              <Button>-</Button>
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
