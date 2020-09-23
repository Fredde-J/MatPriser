import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./css/App.css";
import StartPage from "./pages/StartPage";
import ShoppingListPage from "./pages/ShoppingListPage"
import Header from "./components/Header";
import CategorysContextProvider from "./ContextProviders/CategoryContextProvider";
import ProductContectProvider from "./ContextProviders/ProductContextProvider"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <CategorysContextProvider>
          <ProductContectProvider>
          <main className="container">
              <Header />
              <br />
            <Switch>
              <Route exact path="/" component={StartPage} />
              <Route exact path="/shoppinglist" component={ShoppingListPage}/>
            </Switch>
          </main>
          </ProductContectProvider>
        </CategorysContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
