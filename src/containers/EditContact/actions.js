import { RSAA } from 'redux-api-middleware';


export function getContact(contactId){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `http://localhost:8080/api/contacts/${contactId}`,
            method:'GET',
        },
    };
}

export function updateContact(contactId, contactName,email,phone,address,state,city,zip,institution){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            endpoint: `http://localhost:8080/api/contact/${contactId}`,
            body:    JSON.stringify({
                contactName: contactName,
                email: email,
                phone: phone,
                address: address,
                state: state,
                city: city,
                zipCode: zip,
                institution: institution,
            }),
            method:'PUT',
        },
    };
}