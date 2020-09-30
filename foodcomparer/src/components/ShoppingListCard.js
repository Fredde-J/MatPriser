import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import willys from "../images/willys.jpg";
import coop from "../images/coop4.png";
import hemkop from "../images/hemkop.jpg";
import { ProductContext } from "../ContextProviders/ProductContextProvider";

const ShoppingListCard = () => {
  const allProducts = useContext(ProductContext);
  const [coopTotalPrice, setcoopTotalPrice] = useState(0);
  const [willysTotalPrice, setwillysTotalPrice] = useState(0);
  const [hemkopTotalPrice, sethemkopTotalPrice] = useState(0);
  const [coopItems, setcoopItems] = useState([]);
  const [willysItems, setWillysItems] = useState([]);
  const [hemkopItems, setHemkopItems] = useState([]);
  const [storeItems, setStoreItems] = useState([]);
  const [modal, setModal] = useState(false);
  //the if below will be removed when product card is complete
  if (allProducts.products[0] != undefined) {
    let shoppingItems = [
      [allProducts.products[0], allProducts.products[1]],
      [allProducts.products[5], allProducts.products[4]],
    ];
    localStorage.setItem("shoppingList", JSON.stringify(shoppingItems));
  }
  //*********************************************************************/

  const getItemsFromLocal = () => {
    let itemsFromLocalStorage = JSON.parse(
      localStorage.getItem("shoppingList")
    );
    console.log(itemsFromLocalStorage);
    let willysPrices = 0;
    let coopPrices = 0;
    let hemkopPrices = 0;

    itemsFromLocalStorage.forEach((items) => {
      items.forEach((item) => {
        if (item.pricePerItem) {
          if (item.storeId === 1) {
            setcoopItems(coopItems=>[...coopItems,item])
            coopPrices += item.pricePerItem;
          } else if (item.storeId === 2) {
            setHemkopItems(hemkopItems=>[...hemkopItems,item])
            hemkopPrices += item.pricePerItem;
          } else if (item.storeId === 3) {
            setWillysItems(willysItems => [...willysItems, item])
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

  const getStoreItems = ()=>{
    if(storeItems[0]===null || storeItems[0] === undefined){
      console.log("error")
    }else{
      return(<div> {storeItems[0].name} </div>)
    }
    
  }

  const toggle = (storeId) => {
    setModal(!modal);
    if(!modal){
      let itemsFromLocalStorage = JSON.parse(
        localStorage.getItem("shoppingList")
      );
      itemsFromLocalStorage.forEach((items) => {
        items.forEach((item) => {
          if(item.storeId===storeId){
            setStoreItems(storeItems=>[...storeItems,item])
          } else {
            console.error("no products i localStorage");
          }
        });
      });
    }

  };

  useEffect(() => {
    if (localStorage.getItem("shoppingList")) {
      getItemsFromLocal();
    }
  }, []);


  return (
    <>
      <Card
        body
        onClick={() => {
          toggle(1);
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
          toggle(2);
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
          toggle(3);
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
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Modal title</ModalHeader>
          <ModalBody>
           {getStoreItems()}
          </ModalBody>
        </Modal>
      </div>
    </>
  );
};
export default ShoppingListCard;
