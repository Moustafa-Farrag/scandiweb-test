const set_category = (category_name) => {
    return {
        type: "SET_CATEGORY",
        payload: category_name
    };
};

const set_currency = (currency_name) => {
    return {
        type: "SET_CURRENCY",
        payload: currency_name
    };
};

export default {
    set_category,
    set_currency
};