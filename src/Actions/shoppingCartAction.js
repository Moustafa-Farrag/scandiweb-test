const set_category = () => {
    return {
        type: "SET_CATEGORY"
    };
};

const add_to_cart = () => {
    return {
        type: "ADD_TO_CART"
    };
};


const remove_from_cart = () => {
    return {
        type: "REMOVE_FROM_CART"
    };
};

export default {
    set_category,
    add_to_cart,
    remove_from_cart
};