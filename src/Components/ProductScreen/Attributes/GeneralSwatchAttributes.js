import React from "react";
import '../ProductScreen.css';

function SwatchAttribute({ data, handleAttributeClick, selectedAttributeIndex }) {
    console.log(data, 'here');
    return (
        <section className="product-color">
            <p className="color-text">{data.name}:</p>
            <div className="color-boxes">
                {data.items.map((item, index) => (selectedAttributeIndex === index) ?
                    (<div className="color-box selected-color" style={{ backgroundColor: item.displayValue }} key={item.id} onClick={(e) => handleAttributeClick(e, data.id, index)}  ></div>) :
                    (<div className="color-box" style={{ backgroundColor: item.displayValue }} key={item.id} onClick={(e) => handleAttributeClick(e, data.id, index)}  ></div>)
                )}
            </div>
        </section>
    );
}

export default SwatchAttribute;