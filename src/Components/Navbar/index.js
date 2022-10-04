import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { getCategoriesNames, getCurrencies } from '../../GraphQLQueries';
import generalSettingAction from '../../Actions/generalSettingAction';
import client from '../../GraphQLQueries/client';
import $ from './assets/$.png';
import logo from './assets/logo.png';
import cart from './assets/cart-icon.png';
import arrow from './assets/arrow-icon.png';
import Actions from '../../Actions';
import './Navbar.css';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            currencies: [],
            selectedCategoryIndex: 0,
            showCurrencies: false
        };
        this.fetchAllCurrencies = this.fetchAllCurrencies.bind(this);
        this.handelCurrencyIconOnClick = this.handelCurrencyIconOnClick.bind(this);
        this.handelCurrencyOptionOnClick = this.handelCurrencyOptionOnClick.bind(this);
    }

    async fetchAllCurrencies() {
        client.query({
            query: getCurrencies,
        }).then(res => {
            this.setState({ currencies: res.data.currencies });
        }
        ).catch(err => console.log(err));
    }

    getNavbarCategories() {
        if (this.props.getCategoriesNames.loading) {
            this.setState({ categories: [] });
            return;
        }
        this.setState({ categories: this.props.getCategoriesNames.categories });
    }

    handelCategoryOnClick(e, index) {
        this.setState({ selectedCategoryIndex: index });
        this.props.dispatch(generalSettingAction.set_category(this.state.categories[index].name));
    }

    handelCurrencyIconOnClick(e) {
        this.setState({ showCurrencies: !this.state.showCurrencies });
    }

    handelCurrencyOptionOnClick(e, value) {
        this.props.dispatch(Actions.generalSettingAction.set_currency(value));
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.getCategoriesNames.loading !== this.props.getCategoriesNames.loading) {
            this.getNavbarCategories();
        }
    }

    componentDidMount() {
        this.getNavbarCategories();
        this.fetchAllCurrencies();
    };


    render() {
        return (
            <header className="navbar-header">
                <div className="container-btn-pages">
                    {this.state.categories.map((category, index) => {
                        return (index === this.state.selectedCategoryIndex) ?
                            (<Link to='/'><button onClick={(e) => this.handelCategoryOnClick(e, index)} className="btn-category clicked" key={index}>{category.name}</button></Link>) :
                            (<Link to='/'><button onClick={(e) => this.handelCategoryOnClick(e, index)} className="btn-category" key={index}>{category.name}</button></Link>);
                    })}
                </div>

                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>

                <div className="container-icons">
                    <div className='currency-container' onClick={(e) => this.handelCurrencyIconOnClick()}>
                        <img src={$} className="icon" alt="currency" />
                        <img src={arrow} className="icon arrow" style={{ transform: (this.state.showCurrencies) ? "rotate(0deg)" : "rotate(180deg)" }} alt="currency" />
                    </div>
                    <Link className='link-shopping-cart' to='/shopping-cart'>
                        {
                            (this.props.shoppingCart.length) ? (<p className='shopping-cart-value'> {this.props.shoppingCart.length} </p>) : (<></>)
                        }
                        <img src={cart} className="icon" alt="empty cart" />
                    </Link>
                    < div class="dropdown-currencies" style={{ visibility: (this.state.showCurrencies) ? 'visible' : 'hidden' }} >
                        {
                            this.state.currencies.map(currency => (
                                <div className='currency-item' onClick={(e) => this.handelCurrencyOptionOnClick(e, currency.label)}>
                                    <p className='currency-text'>{`${currency.label}  ${currency.symbol}`}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </header >
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

export default graphql(getCategoriesNames, { name: 'getCategoriesNames' })(connect(mapStateToProps)(Navbar));
