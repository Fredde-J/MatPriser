import React from "react";
import {
    Card, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle
  } from 'reactstrap';

  import milk from '../images/milk.png';
  import '../css/StartPage.css'


const CatagoryCard = ()=>{
    return (
        <>
        <Card className="col-6">
        <CardBody>
          <CardTitle>Mjölk</CardTitle>
        </CardBody>
        <img height="150vh" width="150vw" src={milk} alt="Card image cap" />
      </Card>
        </>
        )
}
export default CatagoryCard;