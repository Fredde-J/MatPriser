import React, { useContext, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Card,Row,Col } from "reactstrap";
import ProductCard from "../components/ProductCard";
import { ProductContext } from "../ContextProviders/ProductContextProvider";
import SearchBar from "../components/SearchBar";

const ProductPage = (props) => {
  let products = useContext(ProductContext)
  let mainCatId = props.match.params.mCatId;

  useEffect(() => {
    products.getProductsByMainCatId(mainCatId);
  }, []);
  
  // useEffect(() => {}, [products.mainCatProducts]);
  
  return (
    <div>
      <Row>
        <Col>
        <SearchBar/>
        </Col>
      </Row>
      <br></br>
      {products.mainCatProducts.slice(0,50).map((product, i) => {
        return (
          <div>
            <ProductCard key={product.id + i} product={product} />
          </div>
        );
      })}
    </div>
  );
  
};

export default withRouter(ProductPage);
