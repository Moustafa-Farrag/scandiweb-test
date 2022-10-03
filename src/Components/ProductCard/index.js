import React, { Component } from 'react';
import cart from './assets/cart-icon.png';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './products.css';

class ProductCart extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.product, 'product');
    }

    render() {
        return (
            <div className="card-item" key={this.props.id}>
                <div className="container-product-img">
                    <img src={this.props.product.gallery[0]} alt="product" className="card-img" />
                </div>
                <p className="product-card-name">{this.props.product.name}</p>
                <p className="product-card-price">{`${this.props.product.prices[0].amount} ${this.props.product.prices[0].currency.symbol}`}</p>
                <Link className="link" to={"/product/" + this.props.product.id}>
                    <img src={cart} className="icon-addToCart" alt="empty cart" />
                </Link>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const shoppingCart = state.shoppingCart;
    const generalSetting = state.generalSetting;
    return {
        shoppingCart,
        generalSetting
    };
}

export default (connect(mapStateToProps)(ProductCart));
