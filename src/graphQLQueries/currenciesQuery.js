import { gql } from '@apollo/client';

const getCurrencies = gql`
    query getCurrencies {
        currencies {
        label,
            symbol
        }
    }
`;

export default getCurrencies;