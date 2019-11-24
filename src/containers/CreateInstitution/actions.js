
import { RSAA } from 'redux-api-middleware';


export function createInstitution(institutionName, address, state, city, zipCode) {
    return {
        [RSAA]: {
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            endpoint: `http://localhost:8080/api/institutions`,
            body: JSON.stringify({
                institutionName: institutionName,
                address: address,
                state: state,
                city: city,
                zipCode: zipCode,
            }),
            method: 'POST',
        },
    };
}