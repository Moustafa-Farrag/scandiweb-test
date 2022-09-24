import React, { Component } from 'react';
import cart from './assets/cart-icon.png';
import { Link } from 'react-router-dom';
import './products.css';

class ProductCart extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.id);
    }

    render() {
        return (
            <div className="card-item" key={this.props.id}>
                <div className="container-product-img">
                    <img src={this.props.img} alt="product" className="card-img" />
                </div>
                <p className="product-card-name">{this.props.product_name}</p>
                <p className="product-card-price">{this.props.product_price}</p>
                <Link className="link" to={"/product/" + this.props.id}>
                    <img src={cart} className="icon-addToCart" alt="empty cart" />
                </Link>
            </div>
        );
    }
}

export default ProductCart;