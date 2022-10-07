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

const updating_product_attributes = (item) => {
    return {
        type: "UPDATING_PRODUCT_ATTRIBUTE",
        payload: item
    };
};


const remove_from_cart = () => {
    return {
        type: "REMOVE_FROM_CART",
    };
};

export default {
    add_to_cart,
    remove_from_cart,
    updating_product_quantity,
    updating_product_attributes
};