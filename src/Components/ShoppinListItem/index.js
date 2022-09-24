import React, { Component } from "react";
//import './ShoppingListItem.css';

class ShoppingListItem extends Component {
    constructor(props) {
        super(props);
    }
    state = {};
    render() {
        return (
            <div className="cart-container">
                <div className="product-in-cart">
                    <section className="product-details">
                        <p className="product-brand-text">
                            {this.props.brand_name}
                        </p>
                        <p className="product-name-text">
                            {this.props.product_name}
                        </p>
                        <p className="price-value-text">50$</p>
                        <section className="product-size">
                            <p className="size-text">
                                size:
                            </p>
                            <div className="size-boxes">
                                <div className="size-box">
                                    <p className="size-box-text">S</p>
                                </div>
                                <div className="size-box">
                                    <p className="size-box-text">M</p>
                                </div>
                                <div className="size-box">
                                    <p className="size-box-text">L</p>
                                </div>
                                <div className="size-box">
                                    <p className="size-box-text">XL</p>
                                </div>
                            </div>
                        </section>
                        <section className="product-color">
                            <p className="color-text">color:</p>
                            <div className="color-boxes">
                                <div className="color-box selected-color"></div>
                                <div className="color-box"></div>
                                <div className="color-box"></div>
                            </div>
                        </section>
                    </section>
                    <section className="quantity-imgs">
                        <section className="product-quantity">
                            <div className="btn-increasing-quantity">
                                +
                            </div>
                            <p className="product-quantity-value">
                                {this.props.quantity}
                            </p>
                            <div className="btn-decreasing-quantity">
                                -
                            </div>
                        </section>
                        <div className="product-imgs">

                        </div>
                    </section>
                </div>
            </div>

        );
    }
}

export default ShoppingListItem;