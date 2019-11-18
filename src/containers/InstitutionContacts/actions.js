import { RSAA } from 'redux-api-middleware';


export function getContacts(institutionId){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `http://localhost:8080/api/institution/${institutionId}/contacts`,
            method:'GET',
        },
    };
}