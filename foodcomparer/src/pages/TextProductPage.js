import React, {
  useContext,
  useEffect,
  useState,
} from "react";
import { Link, withRouter } from "react-router-dom";
import { Button, Card, Form, Input, Label, Row } from "reactstrap";
import ProductCard from "../components/ProductCard";
import { ProductContext } from "../ContextProviders/ProductContextProvider";
import "../css/ProductPageStyling.css";

const ProductPage = (props) => {
  let productContext = useContext(ProductContext);
  const perPage = 30;
  const [initData, setInitData] = useState([]);
  const [onlyEco, setOnlyEco] = useState(false);
  const [more, setMore] = useState(true);
  const [less, setLess] = useState(false);
  const [start, setstart] = useState(0);
  const [finish, setFinish] = useState(perPage)
  const [subcategories, setSubcategories] = useState([]);
  const [mainCategoryName, setMainCategoryName] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

   useEffect(() => {
     checkIsMore();
   }, [onlyEco, initData]);

   const checkIsMore = () => {
     if (
       (!onlyEco && perPage > initData.length) ||
       (onlyEco &&
         perPage > initData.filter((product) => product.isEco === 1).length)
     ) {
       setMore(false);
     } else {
       setMore(true);
     }
   };

  const getProducts = async () => {
    setInitData(
      await productContext.getProductsByName(props.match.params.text)
    );
  };
   
  const toggleEco = () => {
     setOnlyEco(!onlyEco);
     setstart(0);
     setFinish(perPage);
     setLess(false);
  };

  const nextPage = () => {
     setLess(true);
     setstart(finish);
     if (!onlyEco && finish + perPage > initData.length) {
       setFinish(initData.length);
       setMore(false);
     } else if (
       onlyEco &&
       finish + perPage >
         initData.filter((product) => product.isEco === 1).length
     ) {
       setFinish(initData.filter((product) => product.isEco === 1).length);
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
       setFinish(start);
       setstart(start - perPage);
     }
     setMore(true);
     window.scrollTo(0, 0);
  }

  return (
    <div>
      <Card>
        <div className="card-header col-sm-12 d-flex flex-wrap justify-content-left mb-1">
          <h2>{props.match.params.text}</h2>
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
          ? initData
              .slice(start, finish)
              .map((product, i) => (
                <ProductCard
                  key={String.valueOf(product.id) + i}
                  product={product}
                />
              ))
          : initData
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

export default withRouter(ProductPage);
