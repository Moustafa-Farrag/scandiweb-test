const add_to_cart = (item) => {
    return {
        type: "ADD_TO_CART",
        payload: item
    };
};


const remove_from_cart = (id) => {
    return {
        type: "REMOVE_FROM_CART",
        payload: id
    };
};

export default {
    add_to_cart,
    remove_from_cart
};