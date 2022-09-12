import React, { Component } from 'react';
import { connect } from "react-redux";
import './products.css';
import product1 from './assets/shoes.webp';
import product2 from './assets/product2.webp';
import cart from './assets/cart-icon.png';
import actions from '../../Actions';
import ProductCart from '../ProductCard';

class Navbar extends Component {
    constructor(props) {
        super(props);
        console.log(actions, 'action');
        console.log(props, 'pros');
        props.dispatch(actions.generalSettingAction.set_category('mostafa'));
    }
    state = {};
    render() {
        return (
            <div>
                <p className="category-text">
                    Category Names
                </p>
                <div className="container-products">
                    <ProductCart img={product1} product_name="Apollo Running Short" product_price="50.00$" />
                    <ProductCart img={product2} product_name="Apollo Running Short" product_price="50.00$" />
                    <ProductCart img={product1} product_name="Apollo Running Short" product_price="50.00$" />
                    <ProductCart img={product2} product_name="Apollo Running Short" product_price="50.00$" />
                    <ProductCart img={product1} product_name="Apollo Running Short" product_price="50.00$" />
                </div>
            </div >
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

export default connect(mapStateToProps)(Navbar);
