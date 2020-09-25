import React, { useContext, useEffect, useReducer, useState } from "react";
import InfiniteScroll, { loadFunc } from "react-infinite-scroller";
import { withRouter } from "react-router-dom";
import { Card } from "reactstrap";
import ProductCard from "../components/ProductCard";
import { ProductContext } from "../ContextProviders/ProductContextProvider";

const ProductPage = (props) => {
  let products = useContext(ProductContext)
  let mainCatId = props.match.params.mCatId;
  const perPage = 10;
  const types = {
    start: "START",
    loaded: "LOADED",
  };
   useEffect(() => {
     products.getProductsByMainCatId(mainCatId);
   }, []);

   useEffect(()=> {

   }, [products])
  //state for infinite scroll
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

  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    more: true,
    data: products.mainCatProducts.slice(0, perPage),
    after: 0,
  });
  const { loading, data, after, more } = state;

  console.log(data)

  // useEffect(() => {}, [products.mainCatProducts]);

  
  return (
    <div>
      {data[0]
        ? (data.map((product, i) => (
            <ProductCard key={product.id + i} product={product} />
          )))
        : (products.mainCatProducts
            .slice(0, perPage)
            .map((product, i) => (
              <ProductCard key={product.id + i} product={product} />
            )))}

      {loading && <div>Laddar...</div>}

      {!loading && more && (
        <div>
          <button
            className="load-more-btn"
            onClick={() => {
              dispatch({ type: types.start });

              setTimeout(() => {
                const newData = products.mainCatProducts.slice(
                  after,
                  after + perPage
                );
                dispatch({ type: types.loaded, newData });
              }, 1000);
            }}
          >
            Visa Fler
          </button>
        </div>
      )}
    </div>
  );
  
};

export default withRouter(ProductPage);
