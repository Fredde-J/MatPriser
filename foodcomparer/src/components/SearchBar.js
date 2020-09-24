import React from "react"
import {InputGroup,
    InputGroupAddon,
    Button,
    Input,} from "reactstrap"

const SearchBar = ()=>{
    const searchIcon ="/images/searchIcon.svg"

    return(
        <>
         <InputGroup className="d-flex justify-content-center">
            <InputGroupAddon addonType="append">
              <Input placeholder="sök" />
            </InputGroupAddon>
            <Button>
              <img src={searchIcon} alt="searchIcon"></img>
            </Button>
          </InputGroup>
        </>

    );
}
export default SearchBar