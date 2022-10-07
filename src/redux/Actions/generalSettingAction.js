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

const set_bag_overlay = (bagOverlay) => {
    return {
        type: "SET_BAG_OVERLAY",
        payload: bagOverlay
    };

};

export default {
    set_category,
    set_currency,
    set_bag_overlay
};