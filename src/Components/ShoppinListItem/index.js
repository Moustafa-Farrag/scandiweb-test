import React, { Component } from "react";
import GeneralTextAttributes from "../ProductScreen/Attributes/GeneralTextAttributes";
import GeneralSwatchAttributes from "../ProductScreen/Attributes/GeneralSwatchAttributes";
import { connect } from "react-redux";
import './ShoppingListItem.css';

class ShoppingListItem extends Component {
    constructor(props) {
        super(props);
        console.log(props, 'propssssssssssssssssssssssssss');
        this.handleAttributeClick = this.handleAttributeClick.bind(this);
    }

    handleAttributeClick(e, productId, id, index) {
        /* let attributes = this.state.attributes;
         console.log(id);
         attributes[id] = index;
         console.log(attributes);
         this.setState({ attributes }); */
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            console.log(this.props);
        }
    }

    componentDidMount() {
        //this.getProductDetails();
    }

    render() {
        return (
            <div className="cart-container">
                <div className="product-in-cart">
                    <section className="product-details">
                        <p className="product-brand-text">
                            {this.props.productData.brand_name}
                        </p>
                        <p className="product-name-text">
                            {this.props.productData.product_name}
                        </p>
                        <p className="price-value-text">50$</p>
                        { /*
                            this.props.shoppingCart.cart.products.map(item =>
                                (item.attribute.type === 'text') ? (
                                    <GeneralTextAttributes
                                        data={item.attribute}
                                        handleAttributeClick={this.handleAttributeClick}
                                        selectedAttributeIndex={this.state.attributes[attribute.id]}
                                    />) : (
                                    <GeneralSwatchAttributes
                                        data={item.attribute}
                                        handleAttributeClick={this.handleAttributeClick}
                                        selectedAttributeIndex={this.state.attributes[attribute.id]}
                                    />)
                            )
                                    */}
                        {
                            //                            this.props.ShoppingListItem.products.map(item => console.log(item))
                        }
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
                            <div className="btn-increasing-quantity">+</div>
                            <p className="product-quantity-value">2</p>
                            <div className="btn-decreasing-quantity">-</div>
                        </section>
                        <div className="product-imgs">

                        </div>
                    </section>
                </div>
            </div>

        );
    }
}

function mapStateToProps(state) {
    console.log(state, 'from mapState');
    const shoppingCart = state.shoppingCart;
    const generalSetting = state.generalSetting;
    return {
        shoppingCart,
        generalSetting
    };
}

export default (connect(mapStateToProps)(ShoppingListItem));
