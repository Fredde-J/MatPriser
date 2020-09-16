import React from 'react'
import { withRouter } from "react-router-dom";
import ShoppingListCard from "../components/ShoppingListCard"

const ShoppingListPage =()=>{
 return (
     <>
     <h1>shopping list</h1>
     <ShoppingListCard></ShoppingListCard>
     </>
 )

}

export default withRouter(ShoppingListPage);