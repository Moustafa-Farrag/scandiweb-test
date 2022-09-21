import React, { Component } from 'react';
import Navbar from './Components/Navbar';
import ProductsScreen from './Components/ProductsScreen';
import './App.css';
import ShoppingListScreen from './Components/ShoppingListScreen';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <ProductsScreen />
      </div>
    );
  }
}

export default App;
