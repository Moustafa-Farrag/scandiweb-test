const state = (state = { cart: [] }, action) => {
    switch (action.type) {
        case "ADD_TO-CART":
            return { ...state, cart: [...state.cart, action.payload] };
        case "REMOVE_FROM_CART":
            return { ...state, cart: state.cart.filter((item) => item.id !== action.payload) };
        case "UPDATE_CART_ITEM":
            return { ...state };
        default:
            return state;
    }
};

export default state;
