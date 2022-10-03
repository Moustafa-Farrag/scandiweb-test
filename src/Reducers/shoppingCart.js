const state = (shoppingCart = [], action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            console.log(shoppingCart, action.type, 'from state');
            return [...shoppingCart, action.payload];
        case "REMOVE_FROM_CART":
            return shoppingCart.filter((item) => item.id !== action.payload);
        case "UPDATE_CART_ITEM":
            return [...shoppingCart];
        default:
            console.log(shoppingCart, action.type, 'from state def');
            return shoppingCart;
    }
};

export default state;
