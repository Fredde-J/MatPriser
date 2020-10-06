import React, {
  useContext,
  useEffect,
  useState,
} from "react";
import { Link, withRouter } from "react-router-dom";
import { Card, Form, Input, Label } from "reactstrap";
import ProductCard from "../components/ProductCard";
import { ProductContext } from "../ContextProviders/ProductContextProvider";
import { Row, Col } from "reactstrap";

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
    getSubCategories();
    getMainCategoryName();
  }, []);

  const getProducts = async () => {
    setInitData(
      await productContext.getProductsByMainCatId(props.match.params.mCatId)
    );
  };

  const getSubCategories = async  () => {
    setSubcategories( await productContext.getSubcategories(props.match.params.mCatId));
  }

  const getMainCategoryName = async () => {
    setMainCategoryName( await productContext.getMainCategoryName(props.match.params.mCatId));
  }
   
  const toggleEco = () => {
    setOnlyEco(!onlyEco);
    setstart(0);
    setFinish(perPage);
  };

  const nextPage = () => {
    setLess(true);
    setstart(finish);
    if (!onlyEco && finish + perPage > initData.length ){
      setFinish(initData.length)
      setMore(false);
    }else if(onlyEco && finish + perPage > initData.filter((product) => product.isEco === 1).length){
      setFinish(initData.filter((product) => product.isEco === 1).length);
      setMore(false);
    }
    else{
      setFinish(finish+perPage)
    }
    window.scrollTo(0, 0);
  };

  const previousPage = () => {
     if (finish-perPage <= perPage) {
       setFinish(perPage);
       setstart(0);
       setLess(false)
     } else {
       setFinish(finish - perPage);
    setstart(start - (finish - start));
     }
    setMore(true);
    window.scrollTo(0, 0);
  }

  return (
    <div>
        <Card className="row">
          <div className="card-header col-sm-12 d-flex flex-wrap justify-content-left mb-1">{mainCategoryName[0]
              ? mainCategoryName.map((mainCategory, i) => (
                <h2>{mainCategory.name}</h2>
              ))
              : null
            }</div>
          <div className="d-flex flex-wrap justify-content-center mb-3">
            {subcategories[0]
              ? subcategories.map((subcategory, i) => (
                  <Link
                    to={{pathname: "/sproducts/" + subcategory.id,
                  state: {products: initData}}}
                    key={String.valueOf(subcategory.id) + i}
                    className="btn  bg-light text-dark mt-2 mr-3 ml-3"
                  >
                    {subcategory.name}
                  </Link>
                ))
              : null}
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
                  <ProductCard key={String.valueOf(product.id) + i} product={product} />
                ))
            : initData
                .filter((product) => product.isEco == 1)
                .slice(start, finish)
                .map((product, i) => (
                  <ProductCard key={String.valueOf(product.id) + i} product={product} />
                ))}
        </Row>
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
      {/* )} */}
    </div>
  );
};

export default withRouter(ProductPage);
