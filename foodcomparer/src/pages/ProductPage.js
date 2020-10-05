import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { withRouter } from "react-router-dom";
import { Form, Input, Label } from "reactstrap";
import ProductCard from "../components/ProductCard";
import { ProductContext } from "../ContextProviders/ProductContextProvider";

const ProductPage = (props) => {
  let productContext = useContext(ProductContext);
  const perPage = 30;
  const [initData, setInitData] = useState([]);
  const [onlyEco, setOnlyEco] = useState(false);
  const [more, setMore] = useState(true);
  const [less, setLess] = useState(false);
  const [start, setstart] = useState(0);
  const [finish, setFinish] = useState(perPage)

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    setInitData(
      await productContext.getProductsByMainCatId(props.match.params.mCatId)
    );
  };

  const toggleEco = () => {
    setOnlyEco(!onlyEco);
    setstart(0);
    setFinish(perPage);
  };
  console.log(initData)
  console.log(start, finish)

  const nextPage = () => {
    setLess(true);
    setstart(finish);
    if (!onlyEco && finish + perPage > initData.length ){
      setFinish(initData.length)
      setMore(false);
    }else if(onlyEco && finish + perPage > initData.filter((product) => product.isEco == 1).length){
      setFinish(initData.filter((product) => product.isEco == 1).length);
      setMore(false);
    }
    else{
      setFinish(finish+perPage)
    }
    window.scrollTo(0, 0);
  };
  console.log(initData.filter((product) => product.isEco == 1).length);

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
      <Form id="eco-checkbox-form">
        <Input type="checkbox" id="ecocheck" onClick={toggleEco} />
        <Label for="ecocheck" check>
          Visa endast ekoprodukter
        </Label>
      </Form>
      {!onlyEco
        ? initData
            .slice(start, finish)
            .map((product, i) => (
              <ProductCard key={product.id} product={product} />
            ))
        : initData
            .filter((product) => product.isEco == 1)
            .slice(start, finish)
            .map((product, i) => (
              <ProductCard key={product.id + i} product={product} />
            ))}
      <div>
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
      {/* )} */}
    </div>
  );
};

export default withRouter(ProductPage);
