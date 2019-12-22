import { RSAA } from 'redux-api-middleware';


export function getContact(contactId){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `https://salty-citadel-44905.herokuapp.com/api/contacts/${contactId}`,
            method:'GET',
        },
    };
}

export function updateContact(contactId, contactName,email,phone,address,state,city,zip,institutionName){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            endpoint: `https://salty-citadel-44905.herokuapp.com/api/contact/${contactId}`,
            body:    JSON.stringify({
                contactName: contactName,
                email: email,
                phone: phone,
                address: address,
                state: state,
                city: city,
                zipCode: zip,
                institution:{
                    institutionName: institutionName
                }
            }),
            method:'PUT',
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
