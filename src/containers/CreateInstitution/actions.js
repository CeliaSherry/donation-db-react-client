
import { RSAA } from 'redux-api-middleware';


export function createInstitution(institutionName, address, state, city, zipCode) {
    return {
        [RSAA]: {
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            endpoint: `https://salty-citadel-44905.herokuapp.com/api/institutions`,
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
