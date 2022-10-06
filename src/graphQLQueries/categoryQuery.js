import { gql } from '@apollo/client';

const getCategory = gql`
    query getCategory($categoryName: CategoryInput!) {
        category (input: $categoryName){
            name, 
            products {
            id,
            name,
            inStock,
            gallery,
            prices {
                currency {
									label, symbol
                },
              	amount
              }
            }
        }
    }
`;

export default getCategory;