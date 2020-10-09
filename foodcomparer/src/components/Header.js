import React from "react";
import { withRouter } from "react-router-dom";
import {Nav, NavItem, Navbar, NavbarText } from "reactstrap";
import "../css/Header.css";
const Header = (props) => {
  const goTohomepage = () => {
    props.history.push("/");
  };
  const goToShoppingList = () => {
    props.history.push("/shoppinglist");
  };
  const listIcon = "/images/listIcon.svg";
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
        </NavbarText>
      </Navbar>
    </>
  );
};
export default withRouter(Header);
