import React, { Component } from 'react';
import { connect } from "react-redux";
import actions from '../../Actions';
import ProductCart from '../ProductCard';
import { getCategory } from '../../GraphQLQueries';
import client from '../../GraphQLQueries/client';
import './products.css';


class HomeScreen extends Component {
    constructor(props) {
        super(props);
        console.log(props, 'pros');
        console.log(this.state, 'state');
        this.state = {
            products: []
        };
    }

    async fetchAllProducts() {
        client.query({
            query: getCategory,
            variables: {
                categoryName: { title: this.props.generalSetting.category }
            },
        }).then(cu => {
            console.log(cu);
            this.setState({ products: cu.data.category.products });
        }
        ).catch(err => console.log(err));
    }


    componentDidUpdate(prevProps, prevState) {
        if (prevProps.generalSetting.category !== this.props.generalSetting.category) {
            this.fetchAllProducts();
        }
    }

    componentDidMount() {
        this.fetchAllProducts();
    };


    render() {
        return (
            <div>
                <p className="category-text">
                    {this.props.generalSetting.category}
                </p>
                <div className="container-products">
                    {
                        this.state.products.map(product => <ProductCart id={product.id} img={product.gallery[0]} product_name={product.name} product_price="50.00$" />)
                    }
                </div>
            </div >
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

export default (connect(mapStateToProps)(HomeScreen));
