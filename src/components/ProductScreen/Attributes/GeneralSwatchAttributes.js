import React from "react";
import '../ProductScreen.css';

function SwatchAttribute({ attribute, handleAttributeClick, selectedAttributeValue }) {
    return (
        <section className="product-color">
            <p className="color-text">{attribute.name}:</p>
            <div className="color-boxes">
                {attribute.items.map((item) => (selectedAttributeValue === item.value) ?
                    (<div className="color-box selected-color" style={{ backgroundColor: item.displayValue }} key={item.id} onClick={(e) => handleAttributeClick(e, attribute.id, item.value)}  ></div>) :
                    (<div className="color-box" style={{ backgroundColor: item.displayValue }} key={item.id} onClick={(e) => handleAttributeClick(e, attribute.id, item.value)}  ></div>)
                )}
            </div>
        </section>
    );
}

export default SwatchAttribute;