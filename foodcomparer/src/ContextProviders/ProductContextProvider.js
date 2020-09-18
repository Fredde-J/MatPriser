import React, { useState, useEffect } from "react";
import axios from "axios";

export const ProductContext = React.createContext();

const ProductContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [mainCatProducts, setMainCatProducts] = useState([]);
  
  const getProducts = async () => {
    axios
      .get("http://localhost:4000/rest/products")
      .then((response) => {
        return response.data;
      })
      .then((result) => {
        setProducts(result);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getProductsByMainCatId = async (id) => {
    axios
    .get("http://localhost:4000/rest/productsbymaincategoryId/" + id)
    .then((response) => {
      return response.data;
    }).then((result) => {
      setMainCatProducts(result)
    })
    .catch((err) => {
      console.error(err);
    });
  }

  useEffect(() => {
    getProducts();
    getProductsByMainCatId();
  }, []);

  const values = {
    products,
    mainCatProducts,
    getProductsByMainCatId
  };
  return (
    <ProductContext.Provider value={values}>
      {props.children}
    </ProductContext.Provider>
  );
};
export default ProductContextProvider;
