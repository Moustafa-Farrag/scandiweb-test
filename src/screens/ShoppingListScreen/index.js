import React, { Component } from "react";
import ShoppingListItem from "../../components/ShoppingListItem";
import { connect } from "react-redux";
import { totalPriceCalculation, totalQuantity } from "../../helper/calculation";
import './shoppingListScreen.css';
import Actions from "../../redux/Actions";

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
    }

    handelBtnOrderClick() {
        if (this.state.shoppingCart.length > 0) {
            alert("Thanks for your Trust :)");
            this.props.dispatch(Actions.shoppingCartAction.remove_from_cart());
            return;
        }
        alert("No items in the cart :(");
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.shoppingCart !== this.props.shoppingCart) {
            this.getShoppingList();
        }
        if (prevProps.generalSetting.currency !== this.props.generalSetting.currency) {
            this.getShoppingList();
        }
    }

    componentDidMount() {
        this.getShoppingList();
    }

    render() {
        return (
            (!this.state.loading) ? (
                <div>
                    {(this.props.generalSetting.bagOverlay) && (<div className='bag-cart-overlay'></div>)}
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
                                <p className="tax-value">{this.state.currency.symbol + this.state.overAllPrices.taxes.toFixed(2)}</p>
                            </p>
                            <p className="total-quantity">
                                Quantity:
                                <p className="total-quantity-value">{`${totalQuantity(this.state.shoppingCart)}`}</p>
                            </p>
                            <p className="total-price">
                                Total:
                                <p className="total-price-value">{`${this.state.currency.symbol}${this.state.overAllPrices.totalPrice.toFixed(2)}`}</p>
                            </p>
                        </section>
                        <button className="btn-order" onClick={() => this.handelBtnOrderClick()}>
                            ORDER
                        </button>
                    </section>
                </div>) : (<></>)
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

export default (connect(mapStateToProps)(ShoppingListScreen));
