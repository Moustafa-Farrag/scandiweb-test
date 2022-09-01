import React, { Component } from 'react';
import Navbar from './Components/Navbar/Navbar';
import Products from './Components/Products/Products'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Products />
      </div>
    );
  }
}

export default App;
