import React, { useContext, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { ProductContext } from "../ContextProviders/ProductContextProvider";

const SubCatProductPage = (props) => {
  const [mainCatProducts, setMainCatProducts] = useState([]);

  useEffect(() => {
    setMainCatProducts(props.history.location.state.products);
  });

  //useEffect(() => {}, [mainCatProducts]);
  

  return (
    <div>
      {mainCatProducts
        .filter(
          (product) => product.subCategoryId == props.match.params.subCatId
        )
        .map((product, i) => (
          <ProductCard key={String.valueOf(product.id) + i} product={product} />
        ))}
    </div>
  );
};

export default withRouter(SubCatProductPage);
