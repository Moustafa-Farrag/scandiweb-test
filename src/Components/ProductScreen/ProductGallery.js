import React, { Component } from 'react';
import './ProductScreen.css';

function ProductGallery({ gallery, handleImgClick, selectedImgIndex }) {
    return (
    <div className="item-all-imgs">
        {gallery.map((imgUrl, index) => (
            (index === selectedImgIndex) ?
                (
                    <div className="item-img-cont selected-img" key={index} value={index} onClick={(e) => handleImgClick(e, index)}>
                        <img src={imgUrl} alt="" className="item-img" />
                    </div>) :
                (
                    <div className="item-img-cont" key={index} value={index} onClick={(e) => handleImgClick(e, index)}>
                        <img src={imgUrl} alt="" className="item-img" />
                    </div>
                )
        ))}
    </div>
    );
}

export default ProductGallery;