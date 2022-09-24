import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import ProductGallery from './ProductGallery';
import getProduct from '../../GraphQLQueries/productQuery';
import { graphql } from '@apollo/client/react/hoc';
import client from '../../GraphQLQueries/client';
import Size from './Attributes/Size';
import './ProductScreen.css';
import General from './Attributes/General';
import Color from './Attributes/Color';

class ProductScreen extends Component {
    constructor(props) {
        super(props);
        console.log(this.props, 'my props');
        this.state = {
            loading: true,
            error: false,
            product: {},
            selectedImgIndex: 0,
            selectedSizeIndex: 0,
        };
        this.handelImgClick = this.handelImgClick.bind(this);
        this.handelSizeClick = this.handelSizeClick.bind(this);
        this.handelAttributeClick = this.handelAttributeClick.bind(this);
    }

    handelImgClick(e, index) {
        this.setState({ selectedImgIndex: index });
    }

    handelSizeClick(e, index) {
        this.setState({ selectedSizeIndex: index });
    }

    handelAttributeClick(e, id, index) {
        let attributes = this.state.attributes;
        console.log(id);
        attributes[id] = index;
        console.log(attributes);
        this.setState({ attributes });
    }

    async getProductDetails() {
        client.query({
            query: getProduct,
            variables: {
                id: this.props.id
            },
        }).then(cu => {
            console.log(cu.data.product.attributes, 'check');
            let attributes = cu.data.product.attributes.reduce((previousValue, currentValue) => {
                previousValue[currentValue.id] = 0;
                return previousValue;
            }, {});
            this.setState({ product: cu.data.product, loading: false, attributes });
        }
        ).catch(err => console.log(err));
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.loading !== this.state.loading) {
            // this.setState({ ...this.state, loading: false });
            console.log(
                this.state, 'ffffffff'
            );
        }
    }

    componentDidMount() {
        this.getProductDetails();
    }

    render() {
        return (
            (this.state.loading) ? (<p> loading .. </p>) : (
                <section className="item-screen">
                    <ProductGallery
                        gallery={this.state.product.gallery}
                        handleImgClick={this.handelImgClick}
                        selectedImgIndex={this.state.selectedImgIndex}
                    />
                    <div className="item-selected-img-cont">
                        <img src={this.state.product.gallery[this.state.selectedImgIndex]} alt="" className="item-selected-img" />
                    </div>
                    <div className="item-details">

                        <p className="product-brand-text">
                            {this.state.product.brand}
                        </p>
                        <p className="product-name-text">
                            {this.state.product.name}
                        </p>
                        {/*<Size data={this.state.product.attributes[0]}
                            handelSizeClick={this.handelSizeClick}
                            selectedSizeIndex={this.state.selectedSizeIndex} /> */}
                        {this.state.product.attributes.map(attribute =>
                            (attribute.id === 'color') ? (
                                <General
                                    data={attribute}
                                    handelAttributeClick={this.handelAttributeClick}
                                    selectedAttributeIndex={this.state.attributes[attribute.id]}
                                />) : (
                                <Color
                                    data={attribute}
                                    handelAttributeClick={this.handelAttributeClick}
                                    selectedAttributeIndex={this.state.attributes[attribute.id]}
                                />)
                        )
                        }

                        <section className="product-price">
                            <p className="price-text">price:</p>
                            <p className="price-value-text">50$</p>
                        </section>
                        <button className="btn-add-to-cart">
                            <p className="add-to-cart-text">ADD TO CART</p>

                        </button>

                        <p className="product-description-text">
                            {this.state.product.description}
                        </p>

                    </div>
                </section>)
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

export default /*graphql(getProduct, {
    name: 'getProduct',
    options: (props) => {
        return {
            variables: {
                id: props.id
            }
        };
    }
})*/(connect(mapStateToProps)(ProductScreen));

