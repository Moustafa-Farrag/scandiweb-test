const add_to_cart = (item) => {
    console.log(item, 'action');
    return {
        type: "ADD_TO_CART",
        payload: item
    };
};


const updating_product_quantity = (item) => {
    return {
        type: "UPDATING_PRODUCT_QUANTITY",
        payload: item
    };
};


const remove_from_cart = (item) => {
    return {
        type: "REMOVE_FROM_CART",
        payload: item
    };
};

export default {
    add_to_cart,
    remove_from_cart,
    updating_product_quantity
};