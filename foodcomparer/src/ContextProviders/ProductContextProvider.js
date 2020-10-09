import React, { useState } from "react";
import axios from "axios";

export const ProductContext = React.createContext();

const ProductContextProvider = (props) => {
  const [store, setStore] = useState([]);
  

  const getProductsByMainCatId = async (id) => {
    let error;
    var result = await axios
      .get("http://localhost:4000/rest/productsbymaincategoryId/" + id)
      .catch((e) => (error = e));
    return result.data || { error };
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
    return result.data || { error };
  };

  const getSimilarProducts = async (id) => {
    let error;
    let result = await axios
      .get("http://localhost:4000/rest/similareProductsbyId/" + id)
      .catch((e) => (error = e));
    return result.data || { error };
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
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getProductsByName = async (text) => {
    let error;
    var result = await axios
      .get(
        "http://localhost:4000/rest/productsbysearchtext/" +
          text
      )
      .catch((e) => (error = e));
    return result.data || { error };
  };



  const values = {
    store,
    getProductsByMainCatId,
    getStoreNameById,
    getSimilarProducts,
    getSubcategories,
    getProductsBySubCatId,
    getMainCategoryName,
    getProductsByName,
  };
  return (
    <ProductContext.Provider value={values}>
      {props.children}
    </ProductContext.Provider>
  );
};
export default ProductContextProvider;
