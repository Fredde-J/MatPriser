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
      return setList([]);
    let ls = JSON.parse(localStorage.getItem("shoppingList"));
    setList(ls);
  };

  const onButtonClickClearStorage = () => {
    //REMOVE BEFORE MERGE
    localStorage.clear();
    setLoad(false);
  };

  const onAddClick = (product) => {
    let shoppingListLocalStorage = JSON.parse(
      localStorage.getItem("shoppingList")
    );
    shoppingListLocalStorage.push(product);
    localStorage.setItem(
      "shoppingList",
      JSON.stringify(shoppingListLocalStorage)
    );
    setLoad(false);
  };

  const getQuantity = (list, product) => {
    return list.reduce(
      (array, item) =>
        item.articleNumber === product.articleNumber ? array + 1 : array,
      0
    );
  };

  const onRemoveClick = (product) => {
    let index = list.indexOf(product);
    let newArr = [...list.slice(0, index), ...list.slice(index + 1)];
    localStorage.setItem("shoppingList", JSON.stringify(newArr));
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
              handleRemoveClick={onRemoveClick}
            />
          );
        })}
      </>
    );
  };

  //REMOVE AND ALL OF ITS REFERENCES BEFORE MERGE
  const ClearLocalStorage = () => {
    return (
      <button
        onClick={() => {
          onButtonClickClearStorage();
        }}
      >
        Clear LocalStorage (DEV ONLY)
      </button>
    );
  };

  return (
    <>
      <ClearLocalStorage />
      <ShoppingListCard load={load} />
      <br />
      {load && <PrintProducts />}
    </>
  );
};

export default withRouter(ShoppingListPage);
