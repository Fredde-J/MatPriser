import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./css/App.css";
import StartPage from "./pages/StartPage";
import Header from "./components/Header";
import CategorysContextProvider from "./ContextProviders/CategoryContextProvider";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <CategorysContextProvider>
          <main className="container">
            <Header />
            <Switch>
              <Route exact path="/" component={StartPage} />
            </Switch>
          </main>
        </CategorysContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
