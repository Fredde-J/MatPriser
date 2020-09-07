import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './css/App.css';
import StartPage from './pages/StartPage'
import Header from './components/Header'


function App() {
  return (
    <div className="App">
    
      <BrowserRouter>
      <Header/>
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
