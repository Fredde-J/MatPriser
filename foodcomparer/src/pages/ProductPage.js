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
    <div>
      {products.mainCatProducts.slice(0, 50).map((product, i) => {
        return (
          <div>
            <ProductCard key={product.id + i} name={product.name} url={product.photoUrl}/>
          </div>
        );
      })}
    </div>
  );
  
};

export default withRouter(ProductPage);
