import React, { Component } from "react";
import GeneralTextAttributes from "../ProductScreen/Attributes/GeneralTextAttributes";
import GeneralSwatchAttributes from "../ProductScreen/Attributes/GeneralSwatchAttributes";
import { connect } from "react-redux";
import './ShoppingListItem.css';

class ShoppingListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: false,
            product: {},
            selectedImgIndex: 0,
        };
        this.handleAttributeClick = this.handleAttributeClick.bind(this);
        this.handleIncreasingQuantity = this.handleIncreasingQuantity.bind(this);
    }

    handleAttributeClick(e, id, value) {
        // updating the attributes' obj by the selected value
        let selectedAttributes = { ...this.state.selectedAttributes };
        selectedAttributes[id] = value;
        this.setState({ selectedAttributes });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.generalSetting.currency !== this.props.generalSetting.currency) {
            this.settingProductPrice();
        }
    }

    handleIncreasingQuantity() {
        this.setState({ quantity: this.state.quantity + 1 });
    }

    handleDecreasingQuantity() {
        if (this.state.quantity === 1) {
            return
        }
        this.setState({ quantity: this.state.quantity - 1 });
    }

    settingProductPrice() {
        const productPrice = this.props.product.prices.find((price) => (price.currency.label === this.props.generalSetting.currency));
        this.setState({ productPrice });
    }

    fetchingProductDetails() {
        // select the price currency of the product depending on the currency of the redux -> currency
        const productPrice = this.props.product.prices.find((price) => (price.currency.label === this.props.generalSetting.currency));

        // setting the loading, data, attributes' obj and product price
        this.setState({
            loading: false,
            product: this.props.product,
            selectedAttributes: this.props.selectedAttributes,
            quantity: this.props.quantity,
            productPrice
        });

    }

    componentDidMount() {
        this.fetchingProductDetails();
    }

    render() {
        return (
            (!this.state.loading) ? (
                <div className="cart-container">
                    <div className="product-in-cart">
                        <section className="product-details">
                            <p className="product-brand-text">
                                {this.props.product.brand}
                            </p>
                            <p className="product-name-text">
                                {this.props.product.name}
                            </p>
                            <p className="price-value-text">{`${this.state.productPrice.amount} ${this.state.productPrice.currency.symbol}`}</p>
                            {
                                this.props.product.attributes.map(attribute =>
                                    (attribute.type === 'text') ? (
                                        <GeneralTextAttributes
                                            attribute={attribute}
                                            handleAttributeClick={this.handleAttributeClick}
                                            selectedAttributeValue={this.state.selectedAttributes[attribute.id]}
                                        />) : (
                                        <GeneralSwatchAttributes
                                            attribute={attribute}
                                            handleAttributeClick={this.handleAttributeClick}
                                            selectedAttributeValue={this.state.selectedAttributes[attribute.id]}
                                        />)
                                )
                            }
                        </section>
                        <section className="quantity-imgs">
                            <section className="product-quantity">
                                <button className="btn-increasing-quantity" onClick={() => this.handleIncreasingQuantity()}>+</button>
                                <p className="product-quantity-value">{this.state.quantity}</p>
                                <button className="btn-decreasing-quantity" onClick={() => this.handleIncreasingQuantity()}>-</button>
                            </section>
                            <div className="product-imgs-container">
                                <img className="product-img" src={this.state.product.gallery[0]} alt=""></img>
                            </div>
                        </section>
                    </div>
                </div >
            ) : (<></>)
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
