
import { RSAA } from 'redux-api-middleware';


export function createContact(contactName, email, phone, address, state, city, zipCode, institutionName, institutionAddress, institutionCity, institutionState, institutionZipCode) {
    return {
        [RSAA]: {
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            endpoint: `https://salty-citadel-44905.herokuapp.com/api/contacts`,
            body: JSON.stringify({
                contactName: contactName,
                email: email,
                phone: phone,
                address: address,
                state: state,
                city: city,
                zipCode: zipCode,
                institution: {institutionName: institutionName, address: institutionAddress, city: institutionCity, state: institutionState, zipCode: institutionZipCode}
            }),
            method: 'POST',
        },
    };
}
export function getInstitution(institutionName){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `https://salty-citadel-44905.herokuapp.com/api/institution/${institutionName}`,
            method:'GET',
        },
    };
}

export function getAllInstitutions(){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `https://salty-citadel-44905.herokuapp.com/api/institutions`,
            method:'GET',
        },
    };
}
