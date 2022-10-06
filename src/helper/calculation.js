
const totalPriceCalculation = (shoppingCart, currency) => {
    // totalPrice is sum of every Product Price (product_amount * product_price)
    return shoppingCart.reduce((partialPrice, currentProduct) => partialPrice + (currentProduct.quantity * getProductPrice(currentProduct.product, currency)), 0);
};


const getProductPrice = (product, currency) => {
    return product.prices.find((price) => (price.currency.label === currency));
};

const totalQuantity = (shoppingCart) => {
    return shoppingCart.reduce((quantity, currentProduct) => quantity + currentProduct.quantity, 0);
};


export { getProductPrice, totalPriceCalculation, totalQuantity };