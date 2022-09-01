import React, { Component } from 'react';
import Navbar from './Components/Navbar';
import Products from './Components/Products';
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
