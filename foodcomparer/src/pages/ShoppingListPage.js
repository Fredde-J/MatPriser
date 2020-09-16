import React from 'react'
import { withRouter } from "react-router-dom";
import ShoppingListCard from "../components/ShoppingListCard"
import ShoppingListProductCard from '../components/ShoppingListProductCard';

const ShoppingListPage =()=>{
 return (
     <>
     <h1>shopping list</h1>
     <ShoppingListCard></ShoppingListCard>
     <ShoppingListProductCard></ShoppingListProductCard>
     </>
 )

}

export default withRouter(ShoppingListPage);