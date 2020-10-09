import React, {  useContext} from "react";
import { withRouter } from "react-router-dom";
import {
  Row,
  Col,
} from "reactstrap";
import CatagoryCard from "../components/CategoryCard";
import SearchBar from "../components/Searchbar";
//import searchIcon from "/images/searchIcon.svg";
import { CategoryContext } from "../ContextProviders/CategoryContextProvider";

const StartPage = () => {
  const categories = useContext(CategoryContext);
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
