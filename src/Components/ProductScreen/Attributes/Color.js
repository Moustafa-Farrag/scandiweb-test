import React from "react";
import '../ProductScreen.css';

function Color({ data, handelSizeClick, selectedSizeIndex }) {
    console.log(data, selectedSizeIndex, 'here');
    return (
        <section className="product-color">
            <p className="color-text">color:</p>
            <div className="color-boxes">
                <div className="color-box selected-color"></div>
                <div className="color-box"></div>
                <div className="color-box"></div>
            </div>
        </section>
    );
}

export default Color;