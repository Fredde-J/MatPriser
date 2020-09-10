import React from "react";
import {
  Card,
  CardText,
  CardBody,
  CardLink,
  CardTitle,
  CardSubtitle,
} from "reactstrap";

import milk from "../images/milk.png";

const CatagoryCard = (props) => {
  return (
    <>
      <Card className="col-5 ml-4 mb-3 d-flex flex-wrap align-items-center ">
        <CardBody>
          <CardTitle>{props.name}</CardTitle>
        </CardBody>
        <img height="150vh" width="150vw" src={milk} alt="Card image cap" />
      </Card>
    </>
  );
};
export default CatagoryCard;
