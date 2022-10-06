import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { Interweave } from 'interweave';
import ProductGallery from './ProductGallery';
import getProduct from '../../GraphQLQueries/productQuery';
import client from '../../GraphQLQueries/client';
import GeneralTextAttributes from './Attributes/GeneralTextAttributes';
import GeneralSwatchAttributes from './Attributes/GeneralSwatchAttributes';
import Actions from '../../redux/Actions';
import './ProductScreen.css';

class ProductScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: false,
            product: {},
            selectedImgIndex: 0,
        };
        this.handleImgClick = this.handleImgClick.bind(this);
        this.handleAttributeClick = this.handleAttributeClick.bind(this);
        this.handleOrderBtn = this.handleOrderBtn.bind(this);
    }

    handleImgClick(e, index) {
        this.setState({ selectedImgIndex: index });
    }

    handleAttributeClick(e, id, value) {
        // updating the attributes' obj by the selected value
        let selectedAttributes = { ...this.state.selectedAttributes };
        selectedAttributes[id] = value;
        this.setState({ selectedAttributes });
    }

    handleOrderBtn(e) {
        console.log(this.state.product, this.state.selectedAttributes);
        // quantity = 1 by default as not quantity option in this page 
        this.props.dispatch(Actions.shoppingCartAction.add_to_cart({
            product: { ...this.state.product },
            selectedAttributes: { ...this.state.selectedAttributes },
            quantity: 1
        }));
    }

    async getProductDetails() {
        client.query({
            query: getProduct,
            variables: { id: this.props.id },
        }).then(cu => {
            console.log(cu.data.product.attributes, 'check');
            /*
             selected attributes reflect the attributes choices which user took
             it is an object key => attributes' ids,  value => user choice
             starting with a empty object and reduce a list to make the attributes obj
             the default value of any attribute is the first item value
            */
            let selectedAttributes = [...cu.data.product.attributes].reduce((previousValue, currentAtt) => {
                previousValue[currentAtt.id] = currentAtt.items[0].value;
                return previousValue;
            }, {});

            // select the price currency of the product depending on the currency of the redux -> currency
            const productPrice = cu.data.product.prices.find((price) => (price.currency.label === this.props.generalSetting.currency));

            // setting the loading, data, attributes' obj and product price
            this.setState({
                loading: false,
                product: cu.data.product,
                selectedAttributes,
                productPrice
            });
        }
        ).catch(err => console.log(err));
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.generalSetting !== this.props.generalSetting) {
            this.getProductDetails();
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
                        handleImgClick={this.handleImgClick}
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

                        {this.state.product.attributes.map(attribute =>
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

                        <section className="product-price">
                            <p className="price-text">price:</p>
                            <p className="price-value-text">{`${this.state.productPrice.amount} ${this.state.productPrice.currency.symbol}`}</p>
                        </section>

                        <div className="product-order">
                            <button onClick={this.handleOrderBtn} className="btn-add-to-cart">
                                <p className="add-to-cart-text">ADD TO CART</p>
                            </button>
                        </div>

                        <div className="product-description-text">
                            <Interweave content={this.state.product.description} />
                        </div>

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

export default (connect(mapStateToProps)(ProductScreen));

