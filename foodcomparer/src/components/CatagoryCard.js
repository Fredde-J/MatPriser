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
    history.push("/products/search?maincategory="+props.id)
  }
  
  
  return (
    <>
      <Card className="col-3 ml-4 mb-3 d-flex flex-wrap align-items-center" onClick={goToProducts}>
        <CardBody>
          <CardTitle>{props.name}</CardTitle>
        </CardBody>
        <img height="150vh" className="mb-3" width="150vw" src={props.icon} alt="icons" />
      </Card>
    </>
  );
};
export default CatagoryCard;
