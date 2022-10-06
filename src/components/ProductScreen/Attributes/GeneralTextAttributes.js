import React from "react";
import '../ProductScreen.css';

function GeneralTextAttributes({ attribute, handleAttributeClick, selectedAttributeValue }) {
    return (
        <section className="product-size">
            <p className="size-text">
                {attribute.name}:
            </p>
            <div className="size-boxes">
                {
                    attribute.items.map((item) => (selectedAttributeValue === item.value) ?
                        (<div className="size-box selected-size-box" key={item.id} onClick={(e) => handleAttributeClick(e, attribute.id, item.value)}  >
                            <p className="size-box-text">{item.displayValue}</p>
                        </div>) :
                        (<div className="size-box" key={item.id} onClick={(e) => handleAttributeClick(e, attribute.id, item.value)}  >
                            <p className="size-box-text">{item.displayValue}</p>
                        </div>))
                }
            </div>
        </section>
    );
}

export default GeneralTextAttributes;