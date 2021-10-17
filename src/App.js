import React from "react";
import { Route, Switch } from "react-router-dom";

import HomePage from "./pages/HomePage";
import PaginationPage from "./pages/PaginationPage";
import InfiniteScrollPage from "./pages/InfiniteScrollPage";
import Navigation from "./components/layout/Navigation";

import "./Styles/App.scss";


// import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navigation/>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/pagination">
          <PaginationPage />
        </Route>
        <Route path="/infinite">
          <InfiniteScrollPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
