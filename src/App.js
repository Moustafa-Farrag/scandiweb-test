import React, { Component } from 'react';
import Navbar from './Components/Navbar';
import HomeScreen from './Components/HomeScreen';
import ProductScreen from './Components/ProductScreen';
import './App.css';
import ShoppingListScreen from './Components/ShoppingListScreen';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import client from './GraphQLQueries/client';


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
