import React, { useState, useEffect } from "react";
import { Card, Row, Col, Modal, ModalHeader, ModalBody } from "reactstrap";
import willys from "../images/willys.jpg";
import coop from "../images/coop4.png";
import hemkop from "../images/hemkop.jpg";

const ShoppingListCard = (props) => {
  const [coopTotalPrice, setcoopTotalPrice] = useState(0);
  const [willysTotalPrice, setwillysTotalPrice] = useState(0);
  const [hemkopTotalPrice, sethemkopTotalPrice] = useState(0);
  const [storeItems, setStoreItems] = useState([]);
  const [modal, setModal] = useState(false);

  const getTotalPrice = () => {
    let itemsFromLocalStorage = JSON.parse(
      localStorage.getItem("shoppingList")
    );
    let willysPrices = 0;
    let coopPrices = 0;
    let hemkopPrices = 0;

    itemsFromLocalStorage.forEach((items) => {
      items.forEach((item) => {
        if (item.promotionPrice !== null) {
          if (item.storeId === 1) {
            coopPrices += (item.promotionPrice * item.amount);
          } else if (item.storeId === 2) {
            hemkopPrices += item.promotionPrice * item.amount;
          } else if (item.storeId === 3) {
            willysPrices += item.promotionPrice * item.amount;
          }
        } else {
          if (item.storeId === 1) {
            coopPrices += item.pricePerItem * item.amount;
          } else if (item.storeId === 2) {
            hemkopPrices += item.pricePerItem * item.amount;
          } else if (item.storeId === 3) {
            willysPrices += item.pricePerItem * item.amount;
          }
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
        <ul style={{ listStyleType: "none" }}>
          {storeItems.map((storeItem, index) => {
            return (
              <div className="row" key={`${storeItem.name}${storeItem.id}+${index}`}>
                <li key={index} className="col-4">
                  {storeItem.name}:
                </li>
                <li className="col-2 text-center">antal: {storeItem.amount} st</li>
                {!storeItem.promotionType ? (
                  <li></li>
                ) : (
                  <li className="col-2 text-center text-danger">
                    {storeItem.promotionType}
                  </li>
                )}
                {!storeItem.promotionConditionLabel ? (
                  <li></li>
                ) : (
                  <li className="col-2 text-center text-danger">
                    {storeItem.promotionConditionLabel}
                  </li>
                )}
                {!storeItem.promotionPrice ? (
                  <li className="col text-right">
                    {priceToString(storeItem.pricePerItem) } {" "}
                    {storeItem.unit} {storeItem.pricePerUnit ? priceToString(storeItem.pricePerUnit) : null}{" "}
                    {storeItem.pricePerUnit ? storeItem.compareUnit : null}
                  </li>
                ) : (
                  <li className="col text-right text-danger">
                    {storeItem.promotionPrice}{" "}
                    {storeItem.unit} {storeItem.pricePerUnit ? priceToString(storeItem.pricePerUnit) : null}{" "}
                    {storeItem.pricePerUnit ? storeItem.compareUnit : null}
                  </li>
                )}
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
      }
    }
  };

  const priceToString = (price) => {
    price = parseFloat(price).toLocaleString("sv");
    let newPrice = price.toString();
      if(newPrice.includes(',')){
        if( newPrice.substr(newPrice.length-3, 1) !== ','){
          newPrice = newPrice+"0";
        }
    }
    
      return newPrice.replace(".",",")
  
  }

  useEffect(() => {
    if (localStorage.getItem("shoppingList") !== null) {
      getTotalPrice();
    }else{
      setStoreItems([])
      setcoopTotalPrice(0)
      sethemkopTotalPrice(0)
      setwillysTotalPrice(0)
    }
  }, [props.refresh]);

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
            <h2 className="text-right mt-4">{priceToString(willysTotalPrice)} kr</h2>
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
            <h2 className="text-right mt-3">{priceToString(coopTotalPrice)} kr</h2>
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
            <h2 className="text-right mt-3">{priceToString(hemkopTotalPrice)} kr</h2>
          </Col>
        </Row>
      </Card>

      <div>
        <Modal isOpen={modal} toggle={toggle} size="xl">
          <ModalHeader toggle={toggle}>Inköpslista</ModalHeader>
          <ModalBody className="container">{getStoreItems()}</ModalBody>
        </Modal>
      </div>
    </>
  );
};
export default ShoppingListCard;
