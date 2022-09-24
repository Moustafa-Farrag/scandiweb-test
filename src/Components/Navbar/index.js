import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { connect } from "react-redux";
import { getCategoriesNames } from '../../GraphQLQueries';
import $ from './assets/$.png';
import logo from './assets/logo.png';
import cart from './assets/cart-icon.png';
import './Navbar.css';
import generalSettingAction from '../../Actions/generalSettingAction';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    constructor(props) {
        super(props);
        console.log(props, 'navbar');
        this.state = {
            categories: [],
            selectedCategoryIndex: 0
        };
    }

    getNavbarCategories() {
        if (this.props.getCategoriesNames.loading) {
            console.log('refused');
            this.setState({ categories: [] });
            return;
        }
        this.setState({ categories: this.props.getCategoriesNames.categories });
    }

    handelCategoryOnClick(e, index) {
        this.setState({ selectedCategoryIndex: index });
        this.props.dispatch(generalSettingAction.set_category(this.state.categories[index].name));
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.getCategoriesNames.loading !== this.props.getCategoriesNames.loading) {
            this.getNavbarCategories();
        }
    }

    componentDidMount() {
        this.getNavbarCategories();
    };


    render() {
        return (
            <header className="navbar-header">
                <div className="container-btn-pages">
                    {this.state.categories.map((category, index) => {
                        if (index === this.state.selectedCategoryIndex)
                            return (<button onClick={(e) => this.handelCategoryOnClick(e, index)} className="btn-category clicked" key={index}>{category.name}</button>);
                        else
                            return (<button onClick={(e) => this.handelCategoryOnClick(e, index)} className="btn-category" key={index}>{category.name}</button>);
                    })}
                </div>

                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>

                <div className="container-icons">
                    <img src={$} className="icon" alt="currency" />
                    <img src={cart} className="icon" alt="empty cart" />
                </div>
            </header>
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
