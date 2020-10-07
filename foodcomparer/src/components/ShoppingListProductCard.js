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
            </Container>
          </Col>
          <Col xs="2">
            <ButtonGroup size="sm">
              <Button onClick={onRemoveClick}>-</Button>
              <Button disabled>{props.product.amount}</Button>
              <Button onClick={onAddClick}>+</Button>
            </ButtonGroup>
          </Col>
          <Col xs="2" style={{ color: false ? "red" : null }}>
            {props.product.pricePerItem} kr
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default ShoppingListProductCard;
