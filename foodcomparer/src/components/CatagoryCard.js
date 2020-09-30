import React from "react";
import { useHistory } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardTitle,
} from "reactstrap";


const CatagoryCard = (props) => {
  const history = useHistory();

  const goToProducts = () => {
    history.push("/products/"+props.id)
  }
  
  
  return (
    <>
      <Card className="col-4 offset-2 ml-2 mr-2 mb-3 d-flex flex-wrap align-items-center" onClick={goToProducts}>
        <CardBody>
          <CardTitle>{props.name}</CardTitle>
        </CardBody>
        <img height="150vh" width="150vw" src={props.icon} alt="icons" className="mb-2" />
      </Card>
    </>
  );
};
export default CatagoryCard;
