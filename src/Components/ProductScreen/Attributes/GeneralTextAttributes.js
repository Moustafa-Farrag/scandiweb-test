import React from "react";
import '../ProductScreen.css';

function GeneralTextAttributes({ data, handleAttributeClick, selectedAttributeIndex }) {
    console.log(data, selectedAttributeIndex, 'here');
    return (
        <section className="product-size">
            <p className="size-text">
                {data.name}:
            </p>
            <div className="size-boxes">
                {data.items.map((item, index) => (selectedAttributeIndex === index) ?
                    (<div className="size-box selected-size-box" key={item.id} onClick={(e) => handleAttributeClick(e, data.id, index)}  >
                        <p className="size-box-text">{item.displayValue}</p>
                    </div>) :
                    (<div className="size-box" key={item.id} onClick={(e) => handleAttributeClick(e, data.id, index)}  >
                        <p className="size-box-text">{item.displayValue}</p>
                    </div>))}
            </div>
        </section>
    );
}

export default GeneralTextAttributes;