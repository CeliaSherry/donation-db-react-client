import { RSAA } from 'redux-api-middleware';


export function getInstitution(institutionId){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `http://localhost:8080/api/institutions/${institutionId}`,
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
            endpoint: `http://localhost:8080/api/institution/${institutionId}`,
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