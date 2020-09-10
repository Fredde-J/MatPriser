import React, { useState, useEffect } from "react";
import axios from "axios";

export const ProductContext = React.createContext();

export const ProductContextProvider = (props) => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    axios
      .get("http://localhost:4000/rest/categories")
      .then((response) => {
        return response.data;
      })
      .then(result => {
        setProducts(result)
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getProducts();
  }, [])

  const values = {
    products,
  };
  return (
    <ProductContext.Provider value={values}>
      {props.children}
    </ProductContext.Provider>
  );
};
