import React, { Component } from 'react';
import './Navbar.css';
import $ from './assets/$.png';
import logo from './assets/logo.png';
import cart from './assets/cart-icon.png';

class Navbar extends Component {
    constructor(props) {
        super(props);
    }
    state = {};
    render() {
        return (
            <header className="navbar-header">
                <div className="container-btn-pages">
                    <button className="btn-category clicked">WOMEN</button>
                    <button className="btn-category">MEN</button>
                    <button className="btn-category">KIDS</button>
                </div>

                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>

                <div className="container-icons">
                    <img src={$} className="icon" alt="currency" />
                    <img src={cart} className="icon" alt="empty cart" />
                </div>
            </header>
        );
    }
}

export default Navbar;