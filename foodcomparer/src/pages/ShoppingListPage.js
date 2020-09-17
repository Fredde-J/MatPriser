import React from 'react'
import { withRouter } from "react-router-dom";
import ShoppingListCard from "../components/ShoppingListCard"
import ShoppingListProductCard from '../components/ShoppingListProductCard';

const ShoppingListPage =()=>{
 return (
     <>
     <br></br>
     <ShoppingListCard></ShoppingListCard>
     <ShoppingListProductCard></ShoppingListProductCard>
     </>
 )

}

export default withRouter(ShoppingListPage);