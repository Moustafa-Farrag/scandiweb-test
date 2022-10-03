import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { Interweave } from 'interweave';
import ProductGallery from './ProductGallery';
import getProduct from '../../GraphQLQueries/productQuery';
import client from '../../GraphQLQueries/client';
import GeneralTextAttributes from './Attributes/GeneralTextAttributes';
import GeneralSwatchAttributes from './Attributes/GeneralSwatchAttributes';
import Actions from '../../Actions';
import './ProductScreen.css';

class ProductScreen extends Component {
    constructor(props) {
        super(props);
        console.log(this.props, 'my props');
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

    handleAttributeClick(e, id, index) {
        let selectedAttributes = { ...this.state.selectedAttributes };
        console.log(id);
        selectedAttributes[id] = index;
        console.log(selectedAttributes);
        this.setState({ selectedAttributes });
    }

    handleOrderBtn(e) {
        console.log(this.state.product, this.state.selectedAttributes);
        this.props.dispatch(Actions.shoppingCartAction.add_to_cart({ product: { ...this.state.product }, selectedAttributes: { ...this.state.selectedAttributes } }));
    }

    async getProductDetails() {
        client.query({
            query: getProduct,
            variables: {
                id: this.props.id
            },
        }).then(cu => {
            console.log(cu.data.product.attributes, 'check');
            let selectedAttributes = [...cu.data.product.attributes].reduce((previousValue, currentValue) => {
                previousValue[currentValue.id] = 0;
                return previousValue;
            }, {});
            this.setState({ product: cu.data.product, loading: false, selectedAttributes });
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
        if (prevProps !== this.props) {
            console.log(this.props);
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
                                    data={attribute}
                                    handleAttributeClick={this.handleAttributeClick}
                                    selectedAttributeIndex={this.state.selectedAttributes[attribute.id]}
                                />) : (
                                <GeneralSwatchAttributes
                                    data={attribute}
                                    handleAttributeClick={this.handleAttributeClick}
                                    selectedAttributeIndex={this.state.selectedAttributes[attribute.id]}
                                />)
                        )
                        }

                        <section className="product-price">
                            <p className="price-text">price:</p>
                            <p className="price-value-text">50$</p>
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

