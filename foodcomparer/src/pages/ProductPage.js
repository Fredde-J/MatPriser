import React, { useContext, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Card } from "reactstrap";
import ProductCard from "../components/ProductCard";
import { ProductContext } from "../ContextProviders/ProductContextProvider";

const ProductPage = (props) => {
  let products = useContext(ProductContext)
  let mainCatId = props.match.params.mCatId;

  useEffect(() => {
    products.getProductsByMainCatId(mainCatId);
  }, []);
  
  // useEffect(() => {}, [products.mainCatProducts]);
  
  return (
    <div id="productsContainer">
      {products.mainCatProducts.slice(0,60).map((product, i) => {
        return (
            <ProductCard key={product.id + i} product={product} />
        );
      })}
    </div>
  );
  
};

export default withRouter(ProductPage);
