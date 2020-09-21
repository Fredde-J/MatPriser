import React from "react";
import { useHistory } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardTitle,
} from "reactstrap";

import milk from "../images/milk.png";

const CatagoryCard = (props) => {
  const history = useHistory();

  const goToProducts = () => {
    history.push("/products/"+props.id)
  }
  
  return (
    <>
      <Card className="col-5 ml-4 mb-3 d-flex flex-wrap align-items-center " onClick={goToProducts}>
        <CardBody>
          <CardTitle>{props.name}</CardTitle>
        </CardBody>
        <img height="150vh" width="150vw" src={milk} alt="icons" />
      </Card>
    </>
  );
};
export default CatagoryCard;
