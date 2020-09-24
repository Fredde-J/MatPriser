import React, { useState, useEffect } from "react";
import axios from "axios";

export const ProductContext = React.createContext();

const ProductContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [mainCatProducts, setMainCatProducts] = useState([]);
  const [store, setStore] = useState([]);
  
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

  const getSimilarProductsById = async (id) => {
    axios
    .get("" + id)
    .then((response) => {
      return response.data;
    }).then((result) => {
      setStore(result)
      console.log(result)
      console.log("store", result)
    })
    .catch((err) => {
      console.error(err);
    });
  }



  const getStoreNameById = async (id) => {
    axios
    .get("http://localhost:4000/rest/storename/" + id)
    .then((response) => {
      return response.data;
    }).then((result) => {
      setStore(result)
      console.log(result)
      console.log("store", result)
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
    store, 
    mainCatProducts,
    getProductsByMainCatId,
    getStoreNameById,
    getSimilarProductsById,
  };
  return (
    <ProductContext.Provider value={values}>
      {props.children}
    </ProductContext.Provider>
  );
};
export default ProductContextProvider;
