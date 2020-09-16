import React, { defaultProps } from "react";
import { Button, Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";

const ShoppingListProductCard = (props) => {
  return (
    <>
      <Card body>
        <CardBody>
          <CardTitle>{props.name}</CardTitle>
          <CardSubtitle>{props.brand}</CardSubtitle>
          <Button>CLICK ME</Button>
        </CardBody>
      </Card>
    </>
  );
};

ShoppingListProductCard.defaultProps = {
  name: "TESTINGTON FOOD",
  brand: "TESTIA AB",
  ammount: 0,
};

export default ShoppingListProductCard;
