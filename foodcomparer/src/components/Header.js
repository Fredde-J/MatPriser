import React from "react";
import { withRouter } from "react-router-dom";
import listIcon from "../images/listIcon.svg";
import { Row, Col } from "reactstrap";

const Header = () => {
  return (
    <>
      <Row className="" style={{ backgroundColor: "rgb(250, 246, 184)" }}>
        <Col className="col-11 ">
          <h1 style={{ fontSize: "3em" }}>SnålKöp</h1>
        </Col>
        <Col className="col-1">
          <img
            src={listIcon}
            className="rounded float-right"
            style={{ width: 70 }}
          ></img>
        </Col>
      </Row>
    </>
  );
};
export default withRouter(Header);
