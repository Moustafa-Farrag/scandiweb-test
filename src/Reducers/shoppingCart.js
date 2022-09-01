const state = (state = { category: "all", cart: ['hi'] }, action) => {
    switch (action.type) {
        case "SET_CATEGORY":
            return { ...state, category: action.payload };
        case "ADD_TO-CART":
            return { ...state, cart: [...state.cart, action.payload] };
        case "REMOVE_FROM_CART":
            return { ...state, cart: state.cart.filter((item) => item.id !== action.payload) };
        default:
            return state;
    }
};

export default state;
