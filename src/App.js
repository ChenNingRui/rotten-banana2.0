import React from 'react';
import './App.css';
import CustomNavBar from './components/CustomNavBar';
import CustomHomePage from './components/CustomHomePage';
import CustomSearchPage from './components/CustomSearchPage';
import CustomFavoritePage from './components/CustomFavoritePage';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App(props) {
  /* jshint ignore:start */
  return (
    <div className="App">
      <Router>
        <CustomNavBar />
        <Switch>
          <Route exact path="/Search" component={CustomSearchPage} />
          <Route exact path="/" component={CustomHomePage} />
          <Route exact path="/Favorite" component={CustomFavoritePage} />
        </Switch>
      </Router>
    </div >
  );
  /* jshint ignore:end */
}

export default App;
