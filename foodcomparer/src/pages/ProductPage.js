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
  const [loading, setLoading] = useState(false);
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
    //setLoading(true);
    setstart(finish);
   // setFinish(finish + perPage)
    if (finish + perPage > initData.length){
      setFinish(initData.length)
      setMore(false);
    }else{
      setFinish(finish+perPage)
    }
      setMore(initData[start + finish] != undefined);
    window.scrollTo(0, 0);
    //setLoading(false)

  };
  const previousPage = () => {
    setstart(start-(finish-start))
    setFinish(finish-perPage)
    window.scrollTo(0, 0);
  }

  // useEffect(()=> {
  //   setLoading(false)

  // }, [after])


  // setLoading(false);

  // const types = {
  //   start: "START",
  //   loaded: "LOADED",
  // };

  // const reducer = (state, action) => {
  //   switch (action.type) {
  //     case types.start:
  //       return { ...state, loading: true };
  //     case types.loaded:
  //       return {
  //         ...state,
  //         loading: false,
  //         data: [...state.data, ...action.newData],
  //         more: action.newData.length === perPage,
  //         after: state.after + action.newData.length,
  //       };
  //     default:
  //       throw new Error("Don't understand action");
  //   }
  // };

  // const [state, dispatch] = React.useReducer(reducer, {
  //   loading: false,
  //   more: true,
  //   data: [],
  //   after: 0,
  // });
  // const { loading, data, after, more } = state;

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
      {/* {loading && <div>Laddar...</div>} */}
      {/* {!loading && more && ( */}
      <div>
        <button className="switch-page-btn" onClick={() => previousPage()}>
          Föregående
        </button>
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
