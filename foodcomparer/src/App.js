import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./css/App.css";
import StartPage from "./pages/StartPage";
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
            <main className="container">
              <Header />
              <Switch>
                <Route exact path="/" component={StartPage} />
                <Route exact path="/products/:mCatId" component={ProductPage} />
              </Switch>
            </main>
          </ProductContextProvider>
        </CategorysContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
