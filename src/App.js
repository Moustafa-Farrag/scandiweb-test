import React, { Component } from 'react';
import Navbar from './components/Navbar';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import ShoppingListScreen from './screens/ShoppingListScreen';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import client from './graphQLQueries/client';
import './App.css';


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path="/" >
                <HomeScreen />
              </Route>
              <Route exact path="/shopping-cart" >
                <ShoppingListScreen />
              </Route>
              <Route exact path="/product/:id" render={({ match }) => (
                <ProductScreen id={match.params.id} />)} />
            </Switch>
          </div>
        </BrowserRouter>
      </ApolloProvider >
    );
  }
}

export default App;
