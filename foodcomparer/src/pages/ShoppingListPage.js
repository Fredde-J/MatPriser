import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import ShoppingListCard from "../components/ShoppingListCard";
import ShoppingListProductCard from "../components/ShoppingListProductCard";

const ShoppingListPage = () => {
  const [list, setList] = useState([]);
  const [load, setLoad] = useState(false);

  const populateList = () => {
    if (
      JSON.parse(localStorage.getItem("shoppingList")) === null ||
      JSON.parse(localStorage.getItem("shoppingList")).length === 0
    )
      return null;
    let ls = JSON.parse(localStorage.getItem("shoppingList"));
    setList(ls);
  };

  const onAddClick = (product) => {
    let shoppingListFromLocalStore = localStorage.getItem("shoppingList");
    shoppingListFromLocalStore = JSON.parse(shoppingListFromLocalStore);
    shoppingListFromLocalStore.push(product);
    localStorage.setItem(
      "shoppingList",
      JSON.stringify(shoppingListFromLocalStore)
    );
    setLoad(false);
  };

  useEffect(() => {
    populateList();
    setLoad(true);
  }, [load]);

  const PrintProducts = () => {
    return (
      <>
        {list.map((product, index) => {
          return (
            <ShoppingListProductCard
              key={`${index}${product.name}`}
              product={product}
              handleAddClick={onAddClick}
            />
          );
        })}
      </>
    );
  };

  return (
    <>
      <ShoppingListCard />
      <br />
      {load && <PrintProducts />}
    </>
  );
};

export default withRouter(ShoppingListPage);
