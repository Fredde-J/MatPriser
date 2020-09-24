import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import {
  Row,
  Col,
} from "reactstrap";
import CatagoryCard from "../components/CatagoryCard";
import SearchBar from "../components/SearchBar"
//import searchIcon from "/images/searchIcon.svg";
import { CategoryContext } from "../ContextProviders/CategoryContextProvider";

const StartPage = (props) => {
  const [showAllCatagorys, setShowAllCatagorys] = useState(false);
  const categories = useContext(CategoryContext);


  return (
    <>
    
      <Row>
        <Col>
         <SearchBar/>
        </Col>
      </Row>

      <h2 className="d-flex justify-content-center">Populära kategorier</h2>
      <Row>
        {categories.categories.map((category, index) => {
          if (category.isPopular === 1) {
            return (
              <CatagoryCard
                key={category + index}
                name={category.name}
                id={category.id}
                icon={category.picURL}
              ></CatagoryCard>
            );
          }
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
            {categories.categories.map((category, index) => {
              return (
                <CatagoryCard
                  key={category + index}
                  name={category.name}
                ></CatagoryCard>
              );
            })}
          </Row>
        </>
      )}
    </>
  );
};

export default withRouter(StartPage);
