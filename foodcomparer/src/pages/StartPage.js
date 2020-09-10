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

import {
  ProductContextProvider,
  ProductContext,
} from "../ContextProviders/ProductContextProvider";

const StartPage = () => {
  let products = useContext(ProductContext);

  const printProducts = () => {
    console.log("HELLO");
    console.log(products);
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

      <ProductContextProvider>
        <button onClick={printProducts()}>Click me to print products</button>
      </ProductContextProvider>

      <h3 className="d-flex justify-content-center">Populära kategorier</h3>
      <CatagoryCard name="mjölk"></CatagoryCard>
      <h3 className="d-flex justify-content-center">Alla kategorier</h3>
    </>
  );
};

export default withRouter(StartPage);
