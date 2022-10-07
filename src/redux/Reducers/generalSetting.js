const state = (state = { category: "all", currency: { label: "USD", Symbol: "$" }, bagOverlay: false }, action) => {
    switch (action.type) {
        case "SET_CATEGORY":
            return { ...state, category: action.payload };
        case "SET_CURRENCY":
            return { ...state, currency: action.payload };
        case "SET_BAG_OVERLAY":
            return { ...state, bagOverlay: action.payload };
        default:
            return state;
    }
};

export default state;