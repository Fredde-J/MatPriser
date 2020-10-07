import React, { useState, useContext, useEffect } from "react";
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
import SearchBar from "../components/Searchbar";
//import searchIcon from "/images/searchIcon.svg";
import { CategoryContext } from "../ContextProviders/CategoryContextProvider";

const StartPage = (props) => {
  const searchIcon = "/images/searchIcon.svg";
  const [showAllCatagorys, setShowAllCatagorys] = useState(false);
  const categories = useContext(CategoryContext);

  useEffect(() =>{
     
  }, [showAllCatagorys])

  return (
    <>
      <Row>
        <Col>
          <SearchBar />
        </Col>
      </Row>

      <Row className="d-flex justify-content-center mt-5">
        {categories.categories.map((category, index) => {          
            return (
              <CatagoryCard
                key={category + index}
                name={category.name}
                id={category.id}
                icon={category.picURL}
              ></CatagoryCard>
            );
        })}
      </Row>

      
    </>
  );
};

export default withRouter(StartPage);
