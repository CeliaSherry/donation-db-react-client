import { RSAA } from 'redux-api-middleware';


export function getInstitution(institutionId){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `https://salty-citadel-44905.herokuapp.com/api/institutions/${institutionId}`,
            method:'GET',
        },
    };
}

export function updateInstitution(institutionId, institutionName,address,state,city,zipCode){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            endpoint: `https://salty-citadel-44905.herokuapp.com/api/institution/${institutionId}`,
            body:    JSON.stringify({
                institutionName: institutionName,
                address: address,
                state: state,
                city: city,
                zipCode: zipCode,
            }),
            method:'PUT',
        },
    };
}
