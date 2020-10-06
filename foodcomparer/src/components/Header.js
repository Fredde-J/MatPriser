import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
//import listIcon from "/images/listIcon.svg";
import {Nav, NavItem, Navbar, NavbarText } from "reactstrap";

import { pointer } from "../css/Header.css";
const Header = (props) => {
  const [items, setItems] = useState("");
  const goTohomepage = () => {
    props.history.push("/");
  };
  const goToShoppingList = () => {
    props.history.push("/shoppinglist");
  };
  const listIcon = "/images/listIcon.svg";
  const calculateNotificationItems = () => {
    const ls = JSON.parse(localStorage.getItem("shoppingList"));
    if (ls === undefined || ls === null || ls.length === 0) return setItems('');
    else {
      setItems(ls.length)
    }
  }
  useEffect(() => {
    calculateNotificationItems()
  }, [])
  return (
    <>
      <Navbar style={{ backgroundColor: "rgb(250, 246, 184)" }}>
        <Nav style={{ width: "calc(100% - 70px)"}}>
          <NavItem style={{width:"100%"}}>
            <h1
              style={{ fontSize: "3em", textAlign: "center", marginLeft: "70px" }}
              className="pointer"
              onClick={goTohomepage}
            >
              SnålKöp
            </h1>
          </NavItem>
        </Nav>
        <NavbarText>
          <img
            src={ listIcon }
            alt="Go to shoppingList"
            className="rounded float-right pointer"
            style={{ width: 70 }}
            onClick={goToShoppingList}
          ></img>
          <span className="badge">{items}</span>
        </NavbarText>
      </Navbar>
    </>
  );
};
export default withRouter(Header);
