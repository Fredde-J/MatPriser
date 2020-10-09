import React, { useState, useEffect } from "react";
import axios from "axios";

export const CategoryContext = React.createContext();

const CategoryContextProvider = (props) => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    axios
      .get("http://localhost:4000/rest/maincategories")
      .then((response) => {
        return response.data;
      })
      .then((result) => {
        setCategories(result);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const getSubCategoryName = async (subCatId) => {
      let error;
      var result = await axios
        .get(
          "http://localhost:4000/rest/subcategoryname/"+subCatId
        )
        .catch((e) => (error = e));
      return result.data || { error };
  };

  useEffect(() => {
    getCategories();
  },[]);

  const values = {
    categories,
    getSubCategoryName
  };

  return (
    <CategoryContext.Provider value={values}>
      {props.children}
    </CategoryContext.Provider>
  );
};
export default CategoryContextProvider;
