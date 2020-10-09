import React, { useEffect, useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import { Card, Row, Button, Form, Input, Label } from "reactstrap";
import ProductCard from "../components/ProductCard";
import "../css/ProductPageStyling.css";
import {CategoryContext} from "../ContextProviders/CategoryContextProvider"

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
  const [subCategoryName, setSubCategoryName] = useState([]);
  let subCategoryNameContext = useContext(CategoryContext);

  useEffect(() => {
    setMainCatProducts(props.history.location.state.products);
  },[props.history.location.state.products]);

  useEffect(() => {
    setSubCategoryNames()
   // setSubCategoryName(subCategoryNameContext.getSubCategoryName(props.match.params.subCatId));
  });

  useEffect(() => {
    setProductLength(
      mainCatProducts.filter(
        (product) => product.subCategoryId === props.match.params.subCatId
      ).length
    );


    setEcoProductLength(
      mainCatProducts
        .filter(
          (product) => product.subCategoryId === props.match.params.subCatId
        )
        .filter((product) => product.isEco === 1).length
    );
  }, [mainCatProducts]);

 const setSubCategoryNames= async ()=>{
  let names = await subCategoryNameContext.getSubCategoryName(props.match.params.subCatId)
  setSubCategoryName(names);
  
 }

  const toggleEco = () => {
    setOnlyEco(!onlyEco);
    setstart(0);
    setFinish(perPage);
    setLess(false);
  };
  useEffect(() => {
    checkIsMore();
  }, [onlyEco, productLength, ecoProductLength]);

  const checkIsMore = () => {
    if (
      (!onlyEco && perPage >= productLength) ||
      (onlyEco && perPage >= ecoProductLength)
    ) {

      setMore(false);
    } else {
      setMore(true);
    }
  };

  const nextPage = () => {
    setLess(true);
    setstart(finish);
    if (!onlyEco && finish + perPage > productLength) {
      setFinish(productLength);
      setMore(false);
    } else if (onlyEco && finish + perPage > ecoProductLength) {
      setFinish(ecoProductLength);
      setMore(false);
    } else {
      setFinish(finish + perPage);
    }
    window.scrollTo(0, 0);
  };

  const previousPage = () => {
    setMore(true);
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
      <Card className="row">
        <div className="card-header col-sm-12 d-flex flex-wrap justify-content-left mb-1">
          {subCategoryName[0] ? (
            <h4>
              {subCategoryName[0].mainCategoryName +
                " / " +
                subCategoryName[0].subCategoryName}
            </h4>
          ) : null}
        </div>
        <div className="d-flex flex-wrap justify-content-left mb-1 ml-5">
          <Form id="eco-checkbox-form">
            <Input type="checkbox" id="ecocheck" onClick={toggleEco} />
            <Label for="ecocheck" check>
              Visa endast ekoprodukter
            </Label>
          </Form>
        </div>
      </Card>
      <Row className="d-flex justify-content-center mt-3">
        {!onlyEco
          ? mainCatProducts
              .filter(
                (product) =>
                  product.subCategoryId == props.match.params.subCatId
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
                (product) =>
                  product.subCategoryId == props.match.params.subCatId
              )
              .filter((product) => product.isEco == 1)
              .slice(start, finish)
              .map((product, i) => (
                <ProductCard
                  key={String.valueOf(product.id) + i}
                  product={product}
                />
              ))}
      </Row>
      <div className="page-btn-div">
        {less && (
          <Button
            className="switch-page-btn"
            id="prev-btn"
            onClick={() => previousPage()}
          >
            Föregående
          </Button>
        )}
        {more && (
          <Button
            className="switch-page-btn"
            id="next-btn"
            onClick={() => nextPage()}
          >
            Nästa
          </Button>
        )}
      </div>
    </div>
  );
};

export default withRouter(SubCatProductPage);
