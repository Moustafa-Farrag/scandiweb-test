const state = (shoppingCart = [], action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            return addingProduct(shoppingCart, action);
        case "REMOVE_FROM_CART":
            return shoppingCart.filter((item) => item.id !== action.payload);
        case "UPDATE_CART_ITEM":
            return [...shoppingCart];
        case "UPDATING_PRODUCT_QUANTITY":
            // we can consider updating quantity (increasing) is to add a product its quantity is 1
            // and (decreasing) is to add a product with quantity -1
            return addingProduct(shoppingCart, action).filter((item) => item.quantity > 0);
        case "UPDATING_PRODUCT_ATTRIBUTE":

            return [...shoppingCart];
        default:
            console.log(shoppingCart, action.type, 'from state def');
            return shoppingCart;
    }
};


const addingProduct = (shoppingCart, action) => {
    // getting index of selected product by checking the same product and selected attributes 
    let duplicatedProductIndex = shoppingCart.findIndex((item) => JSON.stringify(action.payload.product) === JSON.stringify(item.product) && JSON.stringify(action.payload.selectedAttributes) === JSON.stringify(item.selectedAttributes));
    if (duplicatedProductIndex !== -1) {
        let newShoppingCart = [...shoppingCart];
        let newItem = { ...shoppingCart[duplicatedProductIndex] };
        newItem.quantity += action.payload.quantity;
        newShoppingCart.splice(duplicatedProductIndex, 1, newItem);
        console.log(newShoppingCart, 'new');
        return [...newShoppingCart];
    }
    return [...shoppingCart, action.payload];
};

export default state;
