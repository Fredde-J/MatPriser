import React, { useState, useEffect } from "react";
import axios from "axios";

export const ProductContext = React.createContext();

const ProductContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [subCategoryProducts, setSubCategoryProducts] = useState([]);
  const [mainCatProducts, setMainCatProducts] = useState([]);
  const [store, setStore] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [mainCategoryName, setMainCategoryName] = useState([]);

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
    let error;
    var result = await axios
      .get("http://localhost:4000/rest/productsbymaincategoryId/" + id)
      .catch((e) => (error = e));
    console.log(result.data);
    return result.data || { error };

    // setMainCatProducts(result.data);
    // axios
    // .get("http://localhost:4000/rest/productsbymaincategoryId/" + id)
    // .then((response) => {
    //   return response.data;
    // }).then((result) => {
    //   setMainCatProducts(result)
    // })
    // .catch((err) => {
    //   console.error(err);
    // });
  };

  const getMainCategoryName = async (mainCatId) => {
    let error;
    let result = await axios
      .get("http://localhost:4000/rest/maincategoryname/" + mainCatId)
      .catch((e) => (error = e));
    return result.data || { error };
  };

  const getProductsBySubCatId = async (subCatId) => {
    let error;
    var result = await axios
      .get(
        "http://localhost:4000/rest/getProductsBySubCategoryIdFromDb/" +
          subCatId
      )
      .catch((e) => (error = e));
    console.log(result.data);
    return result.data || { error };
  };

  const getSimilarProducts = async (id) => {
    let error;
    let result = await axios
      .get("http://localhost:4000/rest/similareProductsbyId/" + id)
      .catch((e) => (error = e));
    return result.data || { error };
    /*.then((response) => {
      console.log("GOT IT")
      return response.data;
    }).then((result) => {
      setSimilarProducts(result)
    })
     .catch((err) => {
      console.error(err);
    });*/
  };

  const getSubcategories = async (mainCatId) => {
    let error;
    let result = await axios
      .get("http://localhost:4000/rest/subcategories/" + mainCatId)
      .catch((e) => (error = e));
    return result.data || { error };
  };

  const getStoreNameById = async (id) => {
    axios
      .get("http://localhost:4000/rest/storename/" + id)
      .then((response) => {
        return response.data;
      })
      .then((result) => {
        setStore(result);
        console.log(result);
        console.log("store", result);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const values = {
    products,
    store,
    mainCatProducts,
    similarProducts,
    subcategories,
    subCategoryProducts,
    mainCategoryName,
    getProductsByMainCatId,
    getStoreNameById,
    getSimilarProducts,
    getSubcategories,
    getProductsBySubCatId,
    getMainCategoryName,
  };
  return (
    <ProductContext.Provider value={values}>
      {props.children}
    </ProductContext.Provider>
  );
};
export default ProductContextProvider;
