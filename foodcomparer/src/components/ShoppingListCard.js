import React, {useState, useEffect, useContext } from "react";
import {
    Card,
    Row,
    Col
  } from "reactstrap";
  import willys from '../images/willys.jpg'
  import coop from '../images/coop4.png'
  import hemkop from '../images/hemkop.jpg'
  import {ProductContext} from '../ContextProviders/ProductContextProvider';

const ShoppingListCard = ()=>{
    let allProducts = useContext(ProductContext)
    const [totalPrice, setTotalPrice] = useState(0)
    

    if(allProducts.products[0] !=undefined){
        localStorage.clear()
        let shoppingItems = [];
        shoppingItems.push(allProducts.products[0],allProducts.products[1],allProducts.products[3])
        console.log(shoppingItems)
        localStorage.setItem("shoppingList", JSON.stringify(shoppingItems))
    }
        
    

    const getPrice = () =>{
        
        let itemsFromLocalStorage = JSON.parse(localStorage.getItem("shoppingList"))
        console.log(itemsFromLocalStorage)

        let price = 0;
    
        itemsFromLocalStorage.forEach(item =>price = price + item.pricePerItem )
        console.log(price)
        setTotalPrice(price)
    }

    useEffect(()=>{
        getPrice()
        console.log(totalPrice)
    },[allProducts])

 
return(
    <>

        <Card body >
            <Row>
            <Col xs="6">
            <img  src={willys} height="100vh" width="150vw" alt="affär"></img>
            </Col>
            <Col xs="6" >
          <h2 className="text-right mt-4">528 kr</h2>
          </Col>
          
          </Row>
        </Card>

        <Card body >
            <Row>
            <Col xs="6">
            <img  src={coop} height="100vh" width="150vw" alt="affär"></img>
            </Col>
            <Col xs="6" >
         <h2 className="text-right mt-3">{totalPrice} kr</h2>
          </Col>
          
          </Row>
        </Card>

        <Card body >
            <Row>
            <Col xs="6">
            <img  src={hemkop} height="100 vh" width= "150vw" alt="affär"></img>
            </Col>
            <Col xs="6" >
          <h2 className="text-right mt-3">528 kr</h2>
          </Col>
          
          </Row>
        </Card>

     
      
    </>
)
}
export default ShoppingListCard