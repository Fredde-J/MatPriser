import React, { useState, useEffect, useContext } from "react";
import { Card, Row, Col, Modal, ModalHeader, ModalBody } from "reactstrap";
import willys from "../images/willys.jpg";
import coop from "../images/coop4.png";
import hemkop from "../images/hemkop.jpg";
import { ProductContext } from "../ContextProviders/ProductContextProvider";

const ShoppingListCard = () => {
  const allProducts = useContext(ProductContext);
  const [coopTotalPrice, setcoopTotalPrice] = useState(0);
  const [willysTotalPrice, setwillysTotalPrice] = useState(0);
  const [hemkopTotalPrice, sethemkopTotalPrice] = useState(0);
  const [storeItems, setStoreItems] = useState([]);
  const [modal, setModal] = useState(false);
  //the if below will be removed when product card is complete
  /*
  if (allProducts.products[0] != undefined) {
    let shoppingItems = [
      [allProducts.products[0], allProducts.products[1]],
      [allProducts.products[4904], allProducts.products[2305]],
    ];
    //localStorage.setItem("shoppingList", JSON.stringify(shoppingItems));
  }
  */
  //*********************************************************************/

  const getTotalPrice = () => {
    let itemsFromLocalStorage = JSON.parse(
      localStorage.getItem("shoppingList")
    );
    let willysPrices = 0;
    let coopPrices = 0;
    let hemkopPrices = 0;

    itemsFromLocalStorage.forEach((items) => {
      items.forEach((item) => {
        if (item.pricePerItem) {
          if (item.storeId === 1) {
            coopPrices += item.pricePerItem;
          } else if (item.storeId === 2) {
            hemkopPrices += item.pricePerItem;
          } else if (item.storeId === 3) {
            willysPrices += item.pricePerItem;
          }
        } else {
          console.error("pricePerItem is null or undefined");
        }
      });
    });
    setcoopTotalPrice(coopPrices.toFixed(2));
    setwillysTotalPrice(willysPrices.toFixed(2));
    sethemkopTotalPrice(hemkopPrices.toFixed(2));
  };

  const getStoreItems = () => {
    if (storeItems[0] === null || storeItems[0] === undefined) {
      return <p>Du har inga varor från denna butik</p>;
    } else {
      return (
        <ul style={{listStyleType:"none"}} >
          {storeItems.map((storeItem, index) => {
            return (
              <div class="row">
              <li key={index} class="col">
                {storeItem.name}: 
              </li>
              <li class="col text-center">
               antal: {storeItem.amount}
              </li>
              <li class="col text-right">
              {storeItem.pricePerItem} kr st/{storeItem.pricePerUnit} {storeItem.unit}
              </li>
              </div>
            );
          })}
        </ul>
      );
    }
  };

  const toggle = (storeId) => {
    setModal(!modal);
    if (!modal) {
      setStoreItems([]);
      let itemsFromLocalStorage = JSON.parse(
        localStorage.getItem("shoppingList")
      );
      if (itemsFromLocalStorage !== null) {
        itemsFromLocalStorage.forEach((items) => {
          items.forEach((item) => {
            if (item.storeId === storeId) {
              setStoreItems((storeItems) => [...storeItems, item]);
            }
          });
        });
      } else {
        console.log("localstore is empty");
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("shoppingList")!==null) {
      getTotalPrice();
    }
  }, []);

  return (
    <>
      <Card
        body
        onClick={() => {
          toggle(3);
        }}
      >
        <Row>
          <Col xs="6">
            <img src={willys} height="100vh" width="150vw" alt="affär"></img>
          </Col>
          <Col xs="6">
            <h2 className="text-right mt-4">{willysTotalPrice} kr</h2>
          </Col>
        </Row>
      </Card>

      <Card
        body
        onClick={() => {
          toggle(1);
        }}
      >
        <Row>
          <Col xs="6">
            <img src={coop} height="100vh" width="150vw" alt="affär"></img>
          </Col>
          <Col xs="6">
            <h2 className="text-right mt-3">{coopTotalPrice} kr</h2>
          </Col>
        </Row>
      </Card>

      <Card
        body
        onClick={() => {
          toggle(2);
        }}
      >
        <Row>
          <Col xs="6">
            <img src={hemkop} height="100 vh" width="150vw" alt="affär"></img>
          </Col>
          <Col xs="6">
            <h2 className="text-right mt-3">{hemkopTotalPrice} kr</h2>
          </Col>
        </Row>
      </Card>

      <div>
        <Modal isOpen={modal} toggle={toggle} size="lg">
          <ModalHeader toggle={toggle}>Inköpslista</ModalHeader>
          <ModalBody class="container">{getStoreItems()}</ModalBody>
        </Modal>
      </div>
    </>
  );
};
export default ShoppingListCard;
