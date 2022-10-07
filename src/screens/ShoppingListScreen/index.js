import React, { Component } from "react";
import ShoppingListItem from "../../components/ShoppingListItem";
import { connect } from "react-redux";
import { totalPriceCalculation, totalQuantity } from "../../helper/calculation";
import './shoppingListScreen.css';

class ShoppingListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            shoppingCart: [],
            currency: this.props.generalSetting.currency
        };
        this.getShoppingList = this.getShoppingList.bind(this);
    }

    getShoppingList() {
        this.setState({
            loading: false,
            shoppingCart: this.props.shoppingCart,
            overAllPrices: totalPriceCalculation(this.props.shoppingCart, this.props.generalSetting.currency),
            currency: this.props.generalSetting.currency
        });
        console.log(this.props.generalSetting.currency);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.shoppingCart !== this.props.shoppingCart) {
            this.getShoppingList();
        }
        if (prevProps.generalSetting.currency !== this.props.generalSetting.currency) {
            this.setState({ currency: this.props });
        }
    }

    componentDidMount() {
        this.getShoppingList();
    }

    componentWillUnmount() {
        console.log('will unmount');
    }

    render() {
        return (
            (!this.state.loading) ? (
                <div>
                    <p className="cart-text">
                        CART
                    </p>
                    <section className="shopping-list-screen">
                        <hr />
                        {
                            this.state.shoppingCart.map(item => (
                                <div>
                                    <ShoppingListItem
                                        product={item.product}
                                        selectedAttributes={item.selectedAttributes}
                                        quantity={item.quantity}
                                    />
                                    <hr />
                                </div>
                            ))
                        }
                        <section className="total-statistics">
                            <p className="tax">
                                Tax 21%:
                                <p className="tax-value">{this.state.overAllPrices.taxes.toFixed(2) + " " + this.state.currency.Symbol}</p>
                            </p>
                            <p className="total-quantity">
                                Quantity:
                                <p className="total-quantity-value">{`${totalQuantity(this.state.shoppingCart)} ${this.state.currency.Symbol}`}</p>
                            </p>
                            <p className="total-price">
                                Total:
                                <p className="total-price-value">{`${this.state.overAllPrices.totalPrice.toFixed(2)} ${this.state.currency.Symbol}`}</p>
                            </p>
                        </section>
                        <button className="btn-order">
                            ORDER
                        </button>
                    </section>
                </div>) : (<></>)
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

export default (connect(mapStateToProps)(ShoppingListScreen));
