import { gql } from '@apollo/client';

const getCategoriesNames = gql`
    query getCategoriesNames {
        categories{
            name,
        }
    }
`;

export default getCategoriesNames;