import React, { Component } from 'react';
import { connect } from "react-redux";
import ShoppingListItem from "../ShoppingListItem";
import { totalQuantity } from '../../helper/calculation';
import './DropDownCart.css';

class DropDownCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDropDownCart: true
        };
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
                            <div className="btn-group">
                                <button className='btn-view-bag'>  VIEW BAG </button>
                                <button className='btn-check-out'> CHECK OUT </button>
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