import React, { useContext, useEffect, useReducer, useRef, useState } from "react";

import InfiniteScroll from "react-infinite-scroller";
import { Link, withRouter } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { ProductContext } from "../ContextProviders/ProductContextProvider";
import { Row, Col } from "reactstrap";

const ProductPage = (props) => {
  let productContext = useContext(ProductContext);
  const [initData, setInitData] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [mainCategoryName, setMainCategoryName] = useState([]);

  useEffect(() => {
     getProducts();
     getSubCategories();
     getMainCategoryName();
  }, []);

  // useEffect(() => {
  //   updateData();
  // }, );

  const getProducts = async  () => {
    setInitData( await productContext.getProductsByMainCatId(props.match.params.mCatId));
  }

  const getSubCategories = async  () => {
    setSubcategories( await productContext.getSubcategories(props.match.params.mCatId));
  }

  const getMainCategoryName = async () => {
    //setMainCategoryName( await productContext.getMainCategoryName(props.match.params.mCatId));
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
        <div className="col-sm-12 d-flex flex-wrap justify-content-center mb-3">
          {subcategories[0] ? subcategories.map((subcategory, i) => (
              <Link to={"/sproducts/"+subcategory.id} key={subcategory.id + i} class="btn  bg-light text-dark mt-2 mr-3 ml-3">{subcategory.name}</Link>
            )) : null
          }
        </div>
        <Row className="d-flex justify-content-center mt-3">
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
        </Row>
      </div>
    );
  
};

export default withRouter(ProductPage);
