import { gql } from '@apollo/client';

/*
const getCategories = gql`
{
    categories{
        name,
        products{
            name,
            attributes {
                    id, name, type, items { displayValue, value }
            }
        }
    },
}
`;
*/


const getCategory = gql`
    query getCategory($categoryName: CategoryInput!) {
        category (input: $categoryName){
            name, 
            products {
            id,
            name,
            inStock,
            gallery,
            }
        }
    }
`

export default getCategory;