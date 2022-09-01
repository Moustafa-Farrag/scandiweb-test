import React, { Component } from 'react';
import './products.css';
import product1 from './assets/shoes.webp';
import product2 from './assets/product2.webp';
import cart from './assets/cart-icon.png';

class Navbar extends Component {
    constructor(props) {
        super(props);
    }
    state = {};
    render() {
        return (
            <div>
                <p className="category-text">
                    Category Names
                </p>
                <div className="container-products">
                    <div className="card-item">
                        <div className="container-product-img">
                            <img src={product1} alt="product" className="card-img" />
                        </div>
                        <p className="product-name">Apollo Running Short</p>
                        <p className="product-price">$50.00</p>
                        <img src={cart} className="icon-addToCart" alt="empty cart" />
                    </div>
                    <div className="card-item">
                        <div className="container-product-img">
                            <img src={product2} alt="product" className="card-img" />
                        </div>
                        <p className="product-name">Apollo Running Short</p>
                        <p className="product-price">$50.00</p>
                        <img src={cart} className="icon-addToCart" alt="empty cart" />
                    </div>
                    <div className="card-item">
                        <div className="container-product-img">
                            <img src={product1} alt="product" className="card-img" />
                        </div>
                        <p className="product-name">Apollo Running Short</p>
                        <p className="product-price">$50.00</p>
                        <img src={cart} className="icon-addToCart" alt="empty cart" />
                    </div>
                    <div className="card-item">
                        <div className="container-product-img">
                            <img src={product1} alt="product" className="card-img" />
                        </div>
                        <p className="product-name">Apollo Running Short</p>
                        <p className="product-price">$50.00</p>
                        <img src={cart} className="icon-addToCart" alt="empty cart" />
                    </div>
                    <div className="card-item"></div>
                </div>
            </div>
        );
    }
}

export default Navbar;;