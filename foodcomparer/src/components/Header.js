import React from "react";
import { withRouter } from "react-router-dom";
import listIcon from "../images/listIcon.svg";
import { Row, Col } from "reactstrap";

const Header = (props) => {
  const goTohomepage =()=>{
    props.history.push("/")
  }
  const goToShoppingList =()=>{
    props.history.push("/shoppinglist")
  }
  return (
    <>
      <Row className="" style={{ backgroundColor: "rgb(250, 246, 184)" }}>
        <Col className="col-11 ">
          <h1 style={{ fontSize: "3em" }} onClick={goTohomepage}>SnålKöp</h1>
        </Col>
        <Col className="col-1">
          <img
            src={listIcon}
            className="rounded float-right"
            style={{ width: 70 }}
            onClick={goToShoppingList}
          ></img> 
        </Col>
      </Row>
    </>
  );
};
export default withRouter(Header);
