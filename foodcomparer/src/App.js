import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./css/App.css";
import StartPage from "./pages/StartPage";
import ShoppingListPage from "./pages/ShoppingListPage";
import Header from "./components/Header";
import CategorysContextProvider from "./ContextProviders/CategoryContextProvider";
import ProductContextProvider from "./ContextProviders/ProductContextProvider";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <CategorysContextProvider>
          <ProductContextProvider>
            <Header />
            <main className="container">
              <br />
              <Switch>
                <Route exact path="/" component={StartPage} />
                <Route exact path="/products/:mCatId" component={ProductPage} />
                <Route
                  exact
                  path="/shoppinglist"
                  component={ShoppingListPage}
                />
              </Switch>
            </main>
          </ProductContextProvider>
        </CategorysContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
