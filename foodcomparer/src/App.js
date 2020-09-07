import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import StartPage from './pages/StartPage'

function App() {
  return (
    <div className="App">
      <h1>Header</h1>
      <BrowserRouter>
      <main className="container">
        <Switch>
          <Route exact path="/" component={StartPage} />
        </Switch>

      </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
