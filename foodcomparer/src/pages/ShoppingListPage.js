import React, { useEffect, useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import ShoppingListCard from "../components/ShoppingListCard";
import ShoppingListProductCard from "../components/ShoppingListProductCard";
import { ProductContext } from "../ContextProviders/ProductContextProvider";
import { Button } from "reactstrap";

const ShoppingListPage = () => {
  const [list, setList] = useState([]);
  const [load, setLoad] = useState(false);
  const productContext = useContext(ProductContext);
  const [toggle, setToggle] = useState(false);

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

  const onAddClick = async (product) => {
    let products = await productContext.getSimilarProducts(product.id);
    products.unshift(product);

    let shoppingListFromLocalStore = JSON.parse(
      localStorage.getItem("shoppingList")
    );
    shoppingListFromLocalStore.forEach((items) => {
      for (let i = items.length - 1; i >= 0; i--) {
        for (let j = products.length - 1; j >= 0; j--) {
          if (products[i] === undefined) {
          } else if (items[i].id === products[j].id) {
            items[i].amount++;
            products.splice(j, 1);
          }
        }
      }
    });

    localStorage.setItem(
      "shoppingList",
      JSON.stringify(shoppingListFromLocalStore)
    );
    setLoad(false);
  };

  const onRemoveClick = async (product) => {
    let products = await productContext.getSimilarProducts(product.id);
    products.unshift(product);

    let shoppingListFromLocalStore = JSON.parse(
      localStorage.getItem("shoppingList")
    );
    shoppingListFromLocalStore.forEach((items) => {
      for (let i = items.length - 1; i >= 0; i--) {
        for (let j = products.length - 1; j >= 0; j--) {
          if (products[i] === undefined) {
          } else if (items[i].id === products[j].id) {
            items[i].amount--;
            products.splice(j, 1);
          }
        }
      }
    });

    let filteredShoppingList = shoppingListFromLocalStore.filter((items) => {
      if (items.every((item) => item.amount > 0)) {
        return items;
      }
    });
    localStorage.setItem("shoppingList", JSON.stringify(filteredShoppingList));
    setLoad(false);
  };

  const clearLocalStore = () => {
    localStorage.clear();
    setLoad(false);
    setToggle(false);
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

  return (
    <>
      <ShoppingListCard refresh={load} />
      <br />
      {load && <PrintProducts />}
      <br />
      <div className="row justify-content-md-center ">
        {!toggle ? (
          <Button
            color="danger"
            className="col-3"
            onClick={() => {
              setToggle(true);
            }}
          >
            Rensa inköps lista
          </Button>
        ) : (
          <div className="row justify-content-md-center ">
            <h4 className="col-12 text-center">
              Vill du verkligen rensa inköpslistan?
            </h4>
            <Button color="danger" className="mr-3" onClick={clearLocalStore}>
              Ja
            </Button>
            <Button
              color="danger"
              onClick={() => {
                setToggle(false);
              }}
            >
              Nej
            </Button>
          </div>
        )}
      </div>
      <br />
    </>
  );
};

export default withRouter(ShoppingListPage);
