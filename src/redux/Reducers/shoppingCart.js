import { isNetworkRequestInFlight } from "@apollo/client/core/networkStatus";

const state = (shoppingCart = [], action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            let duplicatedProductIndex = shoppingCart.findIndex((item) => JSON.stringify(action.payload.product) === JSON.stringify(item.product) && JSON.stringify(action.payload.selectedAttributes) === JSON.stringify(item.selectedAttributes));

            console.log(duplicatedProductIndex, 'fff');
            if (duplicatedProductIndex !== -1) {
                let newShoppingCart = [...shoppingCart];
                let newItem = { ...shoppingCart[duplicatedProductIndex] };
                newItem.quantity += action.payload.quantity;
                newShoppingCart.splice(duplicatedProductIndex, 1, newItem);
                console.log(newShoppingCart, 'new');
                return [...newShoppingCart];
            }
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
