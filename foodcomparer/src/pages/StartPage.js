import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import {
  InputGroup,
  InputGroupAddon,
  Button,
  Input,
  Row,
  Col,
} from "reactstrap";
import CatagoryCard from "../components/CatagoryCard";
import searchIcon from "../images/searchIcon.svg";
import "../css/StartPage.css";

import { CategoryContext } from "../ContextProviders/CategoryContextProvider";

const StartPage = () => {
  let categories = useContext(CategoryContext);

  const printCategories = () => {
    console.log("HELLO");
    console.log(categories);
  };

  let catagorys = ["Lätt mjölk"];
  return (
    <>
      <br></br>
      <Row>
        <Col>
          <InputGroup className="d-flex justify-content-center">
            <InputGroupAddon addonType="append">
              <Input placeholder="sök" />
            </InputGroupAddon>
            <Button>
              <img src={searchIcon}></img>
            </Button>
          </InputGroup>
        </Col>
      </Row>
      <h3 onClick={printCategories}>visa alla categorier</h3>

      <h3 className="d-flex justify-content-center">Populära kategorier</h3>
      <CatagoryCard name="mjölk"></CatagoryCard>
      <h3 className="d-flex justify-content-center">Alla kategorier</h3>
    </>
  );
};

export default withRouter(StartPage);
