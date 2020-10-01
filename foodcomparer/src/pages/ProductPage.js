import React, { useContext, useEffect, useReducer, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { withRouter } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { ProductContext } from "../ContextProviders/ProductContextProvider";

const ProductPage = (props) => {
  let productContext = useContext(ProductContext);
  const [initData, setInitData] = useState([]);

  useEffect(() => {
     getProducts();
     //console.log( products.getProductsByMainCatId(props.match.params.mCatId))
  }, []);

  // useEffect(() => {
  //   updateData();
  // }, );

  const getProducts = async  () => {
   setInitData( await productContext.getProductsByMainCatId(props.match.params.mCatId));
  }


   
  const perPage = 30;
  const types = {
    start: "START",
    loaded: "LOADED",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case types.start:
        return { ...state, loading: true };
      case types.loaded:
        return {
          ...state,
          loading: false,
          data: [...state.data, ...action.newData],
          more: action.newData.length === perPage,
          after: state.after + action.newData.length,
        };
      default:
        throw new Error("Don't understand action");
    }
  };

  const [state, dispatch] = React.useReducer(reducer, {
    loading: false,
    more: true,
    data: [],
    after: 0,
  });
  const { loading, data, after, more } = state;


    return (
      <div>
        {data[0]
          ? data.map((product, i) => (
              <ProductCard key={product.id + i} product={product} />
            ))
          : initData
              .slice(0, perPage)
              .map((product, i) => (
                <ProductCard key={product.id + i} product={product} />
              ))}

        {loading && <div>Laddar...</div>}

        {!loading && more && (
          <div>
            <button
              className="load-more-btn"
              onClick={() => {
                dispatch({ type: types.start });

                setTimeout(() => {
                  const newData = initData.slice(after, after + perPage);
                  dispatch({ type: types.loaded, newData });
                }, 1000);
              }}
            >
              Visa Mer
            </button>
          </div>
        )}
      </div>
    );
  
};

export default withRouter(ProductPage);
