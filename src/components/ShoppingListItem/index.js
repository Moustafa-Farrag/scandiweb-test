import React, { Component } from "react";
import GeneralTextAttributes from "../../screens/ProductScreen/Attributes/GeneralTextAttributes";
import GeneralSwatchAttributes from "../../screens/ProductScreen/Attributes/GeneralSwatchAttributes";
import { connect } from "react-redux";
import Actions from "../../redux/Actions";
import './ShoppingListItem.css';
import { getProductPrice } from "../../helper/calculation";

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
        let newSelectedAttributes = { ...this.state.selectedAttributes };
        newSelectedAttributes[id] = value;
        this.props.dispatch(Actions.shoppingCartAction.updating_product_attributes({
            product: this.state.product,
            selectedAttributes: this.state.selectedAttributes,
            newSelectedAttributes
        }));
        //this.setState({ selectedAttributes });
    }

    handleIncreasingQuantity() {
        this.props.dispatch(Actions.shoppingCartAction.updating_product_quantity({
            product: this.state.product,
            selectedAttributes: this.state.selectedAttributes,
            quantity: 1
        }));
    }

    handleDecreasingQuantity() {
        this.props.dispatch(Actions.shoppingCartAction.updating_product_quantity({
            product: this.state.product,
            selectedAttributes: this.state.selectedAttributes,
            quantity: -1
        }));
    }

    settingProductPrice() {
        const productPrice = getProductPrice(this.props.product, this.props.generalSetting.currency);
        this.setState({ productPrice });
    }

    fetchingProductDetails() {
        // select the price currency of the product depending on the currency of the redux -> currency
        const productPrice = getProductPrice(this.props.product, this.props.generalSetting.currency.label);

        // setting the loading, data, attributes' obj and product price
        this.setState({
            loading: false,
            product: this.props.product,
            selectedAttributes: this.props.selectedAttributes,
            quantity: this.props.quantity,
            productPrice
        });

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.generalSetting.currency !== this.props.generalSetting.currency) {
            this.settingProductPrice();
        }
        if (prevProps !== this.props) {
            this.fetchingProductDetails();
        }
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
                            <div className="text-direction">
                                <p className="product-brand-text">
                                    {this.props.product.brand}
                                </p>
                                <p className="product-name-text">
                                    {this.props.product.name}
                                </p>
                                <p className="price-value-text">{`${this.state.productPrice.currency.symbol}${this.state.productPrice.amount}`}</p>
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
                            </div>
                        </section>
                        <section className="quantity-imgs">
                            <section className="product-quantity">
                                <button className="btn-increasing-quantity" onClick={() => this.handleIncreasingQuantity()}>+</button>
                                <p className="product-quantity-value">{this.state.quantity}</p>
                                <button className="btn-decreasing-quantity" onClick={() => this.handleDecreasingQuantity()}>-</button>
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
    const shoppingCart = state.shoppingCart;
    const generalSetting = state.generalSetting;
    return {
        shoppingCart,
        generalSetting
    };
}

export default (connect(mapStateToProps)(ShoppingListItem));
