import React from "react";
import '../ProductScreen.css';

function Size({ data, handelSizeClick, selectedSizeIndex }) {
    console.log(data ,selectedSizeIndex, 'here');
    return (
        <section className="product-size">
            <p className="size-text">
                size:
            </p>
            <div className="size-boxes">
                {data.items.map((item, index) => (selectedSizeIndex === index) ?
                    (<div className="size-box selected-size-box" key={item.id} onClick={() => handelSizeClick(index, item.value)}  >
                        <p className="size-box-text">{item.displayValue}</p>
                    </div>) :
                    (<div className="size-box" key={item.id} onClick={(e) => handelSizeClick(e ,index)}  >
                        <p className="size-box-text">{item.displayValue}</p>
                    </div>))}
            </div>
        </section>
    );
}

export default Size;