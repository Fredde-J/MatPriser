import React, { useContext, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Card } from "reactstrap";
import ProductCard from "../components/ProductCard";
import { ProductContext } from "../ContextProviders/ProductContextProvider";

const ProductPage = (props) => {
  let products = useContext(ProductContext)
  let id = props.match.params.mCatId;
  products.getProductsByMainCatId(id);
  
  useEffect(() => {}, [products.mainCatProducts]);
  
  return (
    <div>
      {products.mainCatProducts.slice(0, 50).map((product, i) => {
        return (
          <div>
            <ProductCard key={product + i} name={product.name} url={product.photoUrl}/>
          </div>
        );
      })}
    </div>
  );
  
};

export default withRouter(ProductPage);
