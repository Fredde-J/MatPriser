import React from "react";
import { useHistory } from "react-router-dom";
import { InputGroup, InputGroupAddon, Button, Input } from "reactstrap";

const SearchBar = () => {
  const history = useHistory();
  const searchIcon = "/images/searchIcon.svg";
  const goToProductPage = () => {
    const inputValue = document.getElementById("input-field").value;
    if (inputValue !== "") {
      history.push("/tproducts/" + inputValue);
    }
  };
  const handleEnterKeyDown = (e) => {
    if (e.key === "Enter") {
      goToProductPage();
    }
  };

  return (
    <>
      <InputGroup className="d-flex justify-content-center">
        <InputGroupAddon addonType="append">
          <Input
            placeholder="sök"
            id="input-field"
            onKeyDown={handleEnterKeyDown}
          />
        </InputGroupAddon>
        <Button onClick={goToProductPage}>
          <img src={searchIcon} alt="searchIcon"></img>
        </Button>
      </InputGroup>
    </>
  );
};
export default SearchBar;
