
const totalPriceCalculation = (shoppingCart, currency, taxPercentage = 0.21) => {
    // totalPrice is sum of every Product Price (product_amount * product_price)
    const totalPriceWithoutTax = shoppingCart.reduce((partialPrice, currentProduct) => partialPrice + (currentProduct.quantity * getProductPrice(currentProduct.product, currency.label).amount), 0);
    const taxes = totalPriceWithoutTax * taxPercentage;
    const totalPrice = totalPriceWithoutTax + taxes;
    return { totalPrice, taxes };
};


const getProductPrice = (product, currency) => {
    return product.prices.find((price) => (price.currency.label === currency));
};

const totalQuantity = (shoppingCart) => {
    return shoppingCart.reduce((quantity, currentProduct) => quantity + currentProduct.quantity, 0);
};


export { getProductPrice, totalPriceCalculation, totalQuantity };