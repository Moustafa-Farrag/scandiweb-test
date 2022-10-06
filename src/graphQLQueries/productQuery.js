import { gql } from '@apollo/client';


const getProduct = gql`
    query getProduct($id: String!) {
    product (id: $id) {
            id,
        brand,
        name,
        gallery,
        description,
        attributes {id, name, type, items {
        id, displayValue, value
        }},
        prices {
        currency {
            label,
            symbol
        },amount
        }
    }
    }
`;

export default getProduct;