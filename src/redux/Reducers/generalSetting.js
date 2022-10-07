const state = (state = { category: "all", currency: {label: "USD", Symbol: "$"} }, action) => {
    switch (action.type) {
        case "SET_CATEGORY":
            console.log(action.payload);
            return { ...state, category: action.payload };
        case "SET_CURRENCY":
            return { ...state, currency: action.payload };
        default:
            return state;
    }
};

export default state;