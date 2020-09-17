import React from 'react'
import {
    Card,
    CardBody,
    CardTitle,
    Row,
    Col
  } from "reactstrap";
  import willys from '../images/willys.jpg'
  import coop from '../images/coop4.png'
  import hemkop from '../images/hemkop.jpg'

const ShoppingListCard = ()=>{
return(
    <>

        <Card body >
            <Row>
            <Col xs="6">
            <img  src={willys} height="100vh" width="150vw"></img>
            </Col>
            <Col xs="6" >
          <h2 className="text-right mt-4">528 kr</h2>
          </Col>
          
          </Row>
        </Card>

        <Card body >
            <Row>
            <Col xs="6">
            <img  src={coop} height="100vh" width="150vw"></img>
            </Col>
            <Col xs="6" >
          <h2 className="text-right mt-3">528 kr</h2>
          </Col>
          
          </Row>
        </Card>

        <Card body >
            <Row>
            <Col xs="6">
            <img  src={hemkop} height="100 vh" width= "150vw"></img>
            </Col>
            <Col xs="6" >
          <h2 className="text-right mt-3">528 kr</h2>
          </Col>
          
          </Row>
        </Card>

     
      
    </>
)
}
export default ShoppingListCard