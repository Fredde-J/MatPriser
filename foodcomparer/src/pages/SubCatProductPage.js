import React, { useContext, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Col, Form, Input, Label } from "reactstrap";
import ProductCard from "../components/ProductCard";
import "../css/ProductPageStyling.css";

const SubCatProductPage = (props) => {
  const [mainCatProducts, setMainCatProducts] = useState([]);
  const perPage = 30;
  const [onlyEco, setOnlyEco] = useState(false);
  const [more, setMore] = useState(true);
  const [less, setLess] = useState(false);
  const [start, setstart] = useState(0);
  const [finish, setFinish] = useState(perPage);
  const [productLength, setProductLength] = useState();
  const [ecoProductLength, setEcoProductLength] = useState();

  useEffect(() => {
    setMainCatProducts(props.history.location.state.products);
  },[]);

  useEffect(() => {

    setProductLength(
      mainCatProducts.filter(
        (product) => product.subCategoryId == props.match.params.subCatId
      ).length
    );

    setEcoProductLength(
      mainCatProducts.filter(
        (product) => product.subCategoryId == props.match.params.subCatId
      ).filter((product) => product.isEco === 1).length
    );

  }, [mainCatProducts])
  
   const toggleEco = () => {
     setOnlyEco(!onlyEco);
     setstart(0);
     setFinish(perPage);
     setLess(false);
     
   };
   useEffect(()=> {
     checkIsMore();
   },[onlyEco, productLength, ecoProductLength])

 
   const checkIsMore = () => {
     console.log(finish + perPage, productLength, more)
      if (!onlyEco && finish + perPage >= productLength || onlyEco && finish + perPage >= ecoProductLength) {
        console.log("hej")
        setMore(false);
      }else{
        setMore(true);
      }
   }

   const nextPage = () => {
     setLess(true);
     setstart(finish);
     if (
       !onlyEco &&
       finish + perPage > productLength
     ) 
     {
       setFinish(productLength);
       setMore(false);
     } 
     else if 
     (
       onlyEco &&
       finish + perPage > ecoProductLength
     ) 
     {
       setFinish(ecoProductLength);
       setMore(false);
     } else {
       setFinish(finish + perPage);
     }
     window.scrollTo(0, 0);
   };

   const previousPage = () => {
      setMore(true);
     console.log(start, finish)
     if (finish - perPage <= perPage) {
       setFinish(perPage);
       setstart(0);
       setLess(false);
     } else {
       setFinish(start);
       setstart(start - perPage);
     }
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
      <div className="col-12 page-buttons">
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
    </div>
  );
};

export default withRouter(SubCatProductPage);
