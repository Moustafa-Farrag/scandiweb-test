const state = (shoppingCart = [], action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            return addingProduct(shoppingCart, action);
        case "REMOVE_FROM_CART":
            return [];
        case "UPDATE_CART_ITEM":
            return [...shoppingCart];
        case "UPDATING_PRODUCT_QUANTITY":
            // we can consider updating quantity (increasing) is to add a product its quantity is 1
            // and (decreasing) is to add a product with quantity -1
            return addingProduct(shoppingCart, action).filter((item) => item.quantity > 0);
        case "UPDATING_PRODUCT_ATTRIBUTE":
            // getting target product  
            // payload => {product, selectedAttributes(old one), newSelectedAttributes}
            let duplicatedProductIndex = shoppingCart.findIndex((item) => JSON.stringify(action.payload.product) === JSON.stringify(item.product) && JSON.stringify(action.payload.selectedAttributes) === JSON.stringify(item.selectedAttributes));
            let newShoppingCart = [...shoppingCart];
            let newItem = { ...shoppingCart[duplicatedProductIndex] };
            newItem.selectedAttributes = action.payload.newSelectedAttributes;
            newShoppingCart.splice(duplicatedProductIndex, 1, newItem);
            return [...newShoppingCart];
        default:
            return shoppingCart;
    }
};


const addingProduct = (shoppingCart, action) => {
    // getting index of selected product by checking the same product and selected attributes 
    // action payload => {product, selectedAttributes ,quantity(newOne)}
    let duplicatedProductIndex = shoppingCart.findIndex((item) => JSON.stringify(action.payload.product) === JSON.stringify(item.product) && JSON.stringify(action.payload.selectedAttributes) === JSON.stringify(item.selectedAttributes));
    if (duplicatedProductIndex !== -1) {
        let newShoppingCart = [...shoppingCart];
        let newItem = { ...shoppingCart[duplicatedProductIndex] };
        newItem.quantity += action.payload.quantity;
        newShoppingCart.splice(duplicatedProductIndex, 1, newItem);
        return [...newShoppingCart];
    }
    return [...shoppingCart, action.payload];
};

export default state;
