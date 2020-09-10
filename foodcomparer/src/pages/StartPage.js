import React, { useEffect, useState } from "react";
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

const StartPage = () => {
  let populareCatagorys = [0, 1, 2, 3];
  let allCatagorys = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  //let showAllCatagorys = false
  const [showAllCatagorys, setShowAllCatagorys] = useState(false);

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

      <h2 className="d-flex justify-content-center">Populära kategorier</h2>

      <Row>
        {populareCatagorys.map((catagory, index) => {
          return <CatagoryCard key={index} />;
        })}
      </Row>

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
          <Row>
            {allCatagorys.map((catagory, index) => {
              return <CatagoryCard key={index} />;
            })}
          </Row>
        </>
      )}
    </>
  );
};

export default withRouter(StartPage);
