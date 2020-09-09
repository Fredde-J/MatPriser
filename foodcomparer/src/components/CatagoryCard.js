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
        <Card className="col-5 ml-4 mb-3 ">
        <CardBody>
          <h2>Lätt Mjölk</h2>
        </CardBody>
        <img height="160vh" width="160vw" src={milk} alt="Card image cap" />
      </Card>
        </>
        )
}
export default CatagoryCard;