import React, { Component } from 'react';
import cart from './assets/cart-icon.png';

class ProductCart extends Component {
    constructor(props) {
        super(props);
        console.log(props, 'productCard');
    }
    state = {};
    render() {
        return (
            <div className="card-item">
                <div className="container-product-img">
                    <img src={this.props.img} alt="product" className="card-img" />
                </div>
                <p className="product-name">{this.props.product_name}</p>
                <p className="product-price">{this.props.product_price}</p>
                <img src={cart} className="icon-addToCart" alt="empty cart" />
            </div>
        );
    }
}

export default ProductCart;