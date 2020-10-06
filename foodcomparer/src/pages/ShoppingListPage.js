import React, { useEffect, useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import ShoppingListCard from "../components/ShoppingListCard";
import ShoppingListProductCard from "../components/ShoppingListProductCard";
import { ProductContext } from "../ContextProviders/ProductContextProvider";

const ShoppingListPage = () => {
  const [list, setList] = useState([]);
  const [load, setLoad] = useState(false);
  const productContext = useContext(ProductContext);

  const populateList = () => {
    if (
      JSON.parse(localStorage.getItem("shoppingList")) === null ||
      JSON.parse(localStorage.getItem("shoppingList")).length === 0
    )
      return setList([]);
    let ls = JSON.parse(localStorage.getItem("shoppingList"));
    ls = ls.map((items) => {
      return items[0];
    });
    setList(ls);
  };

  const onButtonClickClearStorage = () => {
    //REMOVE BEFORE MERGE
    localStorage.clear();
    setLoad(false);
  };

  const onAddClick = async (product) => {
    let products = await productContext.getSimilarProducts(product.id);
    products.unshift(product);
    products.forEach((_product) => {
      _product.amount = 1;
    });

    let shoppingListFromLocalStore = JSON.parse(
      localStorage.getItem("shoppingList")
    );
    shoppingListFromLocalStore.forEach((items) => {
      for (let i = items.length - 1; i >= 0; i--) {
        if (products[i] === undefined) {
        } else if (items[i].id === products[i].id) {
          items[i].amount++;
          products.splice(i, 1);
        }
      }
    });
    if (products[0] !== null && products[0] !== undefined) {
      shoppingListFromLocalStore.push(products);
    }
    localStorage.setItem(
      "shoppingList",
      JSON.stringify(shoppingListFromLocalStore)
    );
    setLoad(false);
  };

  const onRemoveClick = async (product) => {
    let products = await productContext.getSimilarProducts(product.id);
    products.unshift(product);
    products.forEach((_product) => {
      _product.amount = 1;
    });

    let shoppingListFromLocalStore = JSON.parse(
      localStorage.getItem("shoppingList")
    );
    shoppingListFromLocalStore.forEach((items) => {
      for (let i = items.length - 1; i >= 0; i--) {
        if (products[i] === undefined) {
        } else if (items[i].id === products[i].id) {
          items[i].amount--;
          products.splice(i, 1);
        }
      }
    });
    if (products[0] !== null && products[0] !== undefined) {
      shoppingListFromLocalStore.push(products);
    }
    let filteredShoppingList = shoppingListFromLocalStore.filter(items => {
      if (items.every(item => item.amount > 0)) {
        return items
      }
    })
    localStorage.setItem(
      "shoppingList",
      JSON.stringify(filteredShoppingList)
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
      <ShoppingListCard />
      <br />
      {load && <PrintProducts />}
    </>
  );
};

export default withRouter(ShoppingListPage);
