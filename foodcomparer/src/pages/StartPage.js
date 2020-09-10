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

import { CategoryContext } from "../ContextProviders/CategoryContextProvider";

const StartPage = () => {
  const [showAllCatagorys, setShowAllCatagorys] = useState(false);
  let categories = useContext(CategoryContext);

  const printCategories = () => {
    console.log("HELLO");
    console.log(categories);
  };

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
      {!showAllCatagorys ? (
        <h2
          className="d-flex justify-content-center"
          onClick={() => setShowAllCatagorys(true)}
        >
          {" "}
          Fler kategorier
        </h2>
      ) : (
        <>
          <h2
            className="d-flex justify-content-center"
            onClick={() => setShowAllCatagorys(false)}
          >
            Mindre kategorier
          </h2>
          <h3>
            I AM MORE CATEGORIES FEAR ME <br></br>
            GET IN TO THE CHOPPAAAA
          </h3>
        </>
      )}
    </>
  );
};

export default withRouter(StartPage);
