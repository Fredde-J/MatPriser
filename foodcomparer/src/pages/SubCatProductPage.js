import React, { useContext, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Form, Input, Label } from "reactstrap";
import ProductCard from "../components/ProductCard";
import { ProductContext } from "../ContextProviders/ProductContextProvider";

const SubCatProductPage = (props) => {
  const [mainCatProducts, setMainCatProducts] = useState([]);
  const perPage = 30;
  const [onlyEco, setOnlyEco] = useState(false);
  const [more, setMore] = useState(true);
  const [less, setLess] = useState(false);
  const [start, setstart] = useState(0);
  const [finish, setFinish] = useState(perPage);

  useEffect(() => {
    setMainCatProducts(props.history.location.state.products);
  });
  
   const toggleEco = () => {
     setOnlyEco(!onlyEco);
     setstart(0);
     setFinish(perPage);
   };

   const nextPage = () => {
     setLess(true);
     setstart(finish);
     if (!onlyEco && finish + perPage > mainCatProducts.length) {
       setFinish(mainCatProducts.length);
       setMore(false);
     } else if (
       onlyEco &&
       finish + perPage >
         mainCatProducts.filter((product) => product.isEco === 1).length
     ) {
       setFinish(
         mainCatProducts.filter((product) => product.isEco === 1).length
       );
       setMore(false);
     } else {
       setFinish(finish + perPage);
     }
     window.scrollTo(0, 0);
   };

   const previousPage = () => {
     if (finish - perPage <= perPage) {
       setFinish(perPage);
       setstart(0);
       setLess(false);
     } else {
       setFinish(finish - perPage);
       setstart(start - (finish - start));
     }
     setMore(true);
     window.scrollTo(0, 0);
   };

  return (
    <div>
      <Form id="eco-checkbox-form">
        <Input type="checkbox" id="ecocheck" onClick={toggleEco} />
        <Label for="ecocheck" check>
          Visa endast ekoprodukter
        </Label>
      </Form>
      {!onlyEco
        ? mainCatProducts
            .filter(
              (product) => product.subCategoryId == props.match.params.subCatId
            )
            .slice(start, finish)
            .map((product, i) => (
              <ProductCard
                key={String.valueOf(product.id) + i}
                product={product}
              />
            ))
        : mainCatProducts
            .filter(
              (product) => product.subCategoryId == props.match.params.subCatId
            )
            .filter((product) => product.isEco == 1)
            .slice(start, finish)
            .map((product, i) => (
              <ProductCard
                key={String.valueOf(product.id) + i}
                product={product}
              />
            ))}
      {less && (
        <button className="switch-page-btn" onClick={() => previousPage()}>
          Föregående
        </button>
      )}
      {more && (
        <button className="switch-page-btn" onClick={() => nextPage()}>
          Nästa
        </button>
      )}
    </div>
  );
};

export default withRouter(SubCatProductPage);
