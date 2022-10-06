import React, { Component } from "react";
import ShoppingListItem from "../ShoppingListItem";
import { connect } from "react-redux";
import './shoppingListScreen.css';

class ShoppingListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            shoppingCart: []
        };
        this.getShoppingList = this.getShoppingList.bind(this);
    }

    getShoppingList() {
        console.log(this.props.shoppingCart, 'ffffffffff');
        this.setState({ loading: false, shoppingCart: this.props.shoppingCart });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.getShoppingList !== this.props.getShoppingList) {
            this.getShoppingList();
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
                                    <ShoppingListItem product={item.product} selectedAttributes={item.selectedAttributes} quantity={item.quantity} />
                                    <hr />
                                </div>
                            ))
                        }
                        {/*<ShoppingListItem brand_name="Apollo" product_name=" Running Short" quantity={2} />
                    <hr />*/}
                        <section className="total-statistics">
                            <p className="tax">
                                Tax 21%:
                                <p className="tax-value">$42.00</p>
                            </p>
                            <p className="total-quantity">
                                Quantity:
                                <p className="total-quantity-value">3</p>
                            </p>
                            <p className="total-price">
                                Total:
                                <p className="total-price-value">$200.00</p>
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
