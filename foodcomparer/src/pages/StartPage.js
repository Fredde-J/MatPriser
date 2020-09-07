import React from "react";
import { withRouter } from "react-router-dom";
import {
    Card, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle
  } from 'reactstrap';

  import milk from '../images/milk.png';
  import '../css/StartPage.css'


const StartPage = ()=>{
    return (
        <>

        <h3>Populära kategorier</h3>
<div className="row">
        <Card className="col-6">
        <CardBody>
          <CardTitle>Mjölk</CardTitle>
        </CardBody>
        <img height="150vh" width="150vw" src={milk} alt="Card image cap" />
      </Card>

      <Card className="col-6">
        <CardBody>
          <CardTitle>Mjölk</CardTitle>
        </CardBody>
        <img height="150vh" width="150vw" src={milk} alt="Card image cap" />
      </Card>
    

      <Card className="col-6">
        <CardBody>
          <CardTitle>Mjölk</CardTitle>
        </CardBody>
        <img height="150vh" width="150vw" src={milk} alt="Card image cap" />
      </Card>

      <Card className="col-6">
        <CardBody>
          <CardTitle>Mjölk</CardTitle>
        </CardBody>
        <img height="150vh" width="150vw" src={milk} alt="Card image cap" />
      </Card>
      </div>
        </>
        )
}


    export default withRouter(StartPage);
