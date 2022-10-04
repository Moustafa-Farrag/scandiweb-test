import React, { Component } from 'react';
import cart from './assets/cart-icon.png';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './products.css';

class ProductCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            console.log('here', this.props.generalSetting.currency);
            this.setState({ productPrice: this.props.product.prices.find((price) => (price.currency.label === this.props.generalSetting.currency)) });
            console.log(this.productPrice, 'after here');
        }
    }

    componentDidMount() {
        this.setState({
            loading: false,
            product: this.props.product,
            productPrice: this.props.product.prices.find((price) => (price.currency.label === this.props.generalSetting.currency))
        });
    }

    render() {
        return (
            (!this.state.loading) ? (
                <div className="card-item" key={this.state.id}>
                    <div className="container-product-img">
                        <img src={this.state.product.gallery[0]} alt="product" className="card-img" />
                    </div>
                    <p className="product-card-name">{this.state.product.name}</p>
                    <p className="product-card-price">{`${this.state.productPrice.amount} ${this.state.productPrice.currency.symbol}`}</p>
                    <Link className="link" to={"/product/" + this.state.product.id}>
                        <img src={cart} className="icon-addToCart" alt="cart icon" />
                    </Link>
                </div>
            ) : (<></>)
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
