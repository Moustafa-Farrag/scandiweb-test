import React, { Component } from 'react';
import { connect } from "react-redux";
import ShoppingListItem from "../ShoppingListItem";
import { Link } from 'react-router-dom';
import { totalPriceCalculation, totalQuantity } from '../../helper/calculation';
import Actions from '../../redux/Actions';
import './DropDownCart.css';

class DropDownCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDropDownCart: true,
            totalPrice: totalPriceCalculation(this.props.shoppingCart, this.props.generalSetting.currency)
        };
        this.handelViewBagBtnClick = this.handelViewBagBtnClick.bind(this);
        this.handelOrderBtnClick = this.handelOrderBtnClick.bind(this);
    }

    handelOrderBtnClick() {
        if (this.props.shoppingCart.length > 0) {
            alert("Thanks for your Trust :)");
            this.props.dispatch(Actions.shoppingCartAction.remove_from_cart());
            return;
        }
        alert("No items in the cart :(");
    }

    handelViewBagBtnClick() {
        this.props.dispatch(Actions.generalSettingAction.set_bag_overlay(!this.props.generalSetting.bagOverlay));
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.shoppingCart !== prevProps.shoppingCart){
            this.setState({
                showDropDownCart: true,
                totalPrice: totalPriceCalculation(this.props.shoppingCart, this.props.generalSetting.currency)
            });
        }
    }

    render() {
        return (
            <div>
                {
                    (
                        < div class="dropdown-cart" style={{ visibility: (this.state.showDropDownCart) ? 'visible' : 'hidden' }} >
                            <div className='bag-items'>
                                <p className='my-bag-text'>My Bag,&nbsp;</p>
                                <p className='items-num-text'>{totalQuantity(this.props.shoppingCart)} items</p>
                            </div>
                            {
                                this.props.shoppingCart.slice(0, 2).map(item =>
                                    <ShoppingListItem product={item.product}
                                        quantity={item.quantity}
                                        selectedAttributes={item.selectedAttributes}
                                    />)
                            }
                            <div className='bag-total-price'>
                                <p className='total-price-text'>Total:</p>
                                <p className='total-price-text'>{this.props.generalSetting.currency.symbol + this.state.totalPrice.totalPrice}</p>
                            </div>
                            <div className="btn-group">
                                <Link to="/shopping-cart" onClick={() => this.handelViewBagBtnClick()}>
                                    <button className='btn-view-bag'>  VIEW BAG </button>
                                </Link>
                                <button className='btn-check-out' onClick={() => this.handelOrderBtnClick()}> CHECK OUT </button>
                            </div>
                        </div >
                    )
                }
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

export default (connect(mapStateToProps)(DropDownCart));