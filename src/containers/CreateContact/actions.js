
import { RSAA } from 'redux-api-middleware';


export function createContact(contactName, email, phone, address, state, city, zipCode, institution) {
    return {
        [RSAA]: {
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            endpoint: `http://localhost:8080/api/contacts`,
            body: JSON.stringify({
                contactName: contactName,
                email: email,
                phone: phone,
                address: address,
                state: state,
                city: city,
                zipCode: zipCode,
                institution: institution,
            }),
            method: 'POST',
        },
    };
}