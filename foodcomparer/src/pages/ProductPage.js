import React, { useContext, useEffect, useReducer, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { withRouter } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { ProductContext } from "../ContextProviders/ProductContextProvider";

const ProductPage = (props) => {
  let products = useContext(ProductContext)
  const [data, setData] = useState([]);

    useEffect(() => {
      products.getProductsByMainCatId(props.match.params.mCatId);
    }, []);
  
    
    useEffect(() => {
     updateData()
      
    }, [products.mainCatProducts]);
    
    function updateData(){
      setData(products.mainCatProducts);
    }
    

    return (
      <div>
      {data.slice(0,50).map((product, i) => (
            <ProductCard key={product.id + i} product={product} />
          ))}
      </div>
    );
  
};

export default withRouter(ProductPage);
