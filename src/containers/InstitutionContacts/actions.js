import { RSAA } from 'redux-api-middleware';


export function getContacts(institutionId){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `https://salty-citadel-44905.herokuapp.com/api/institution/${institutionId}/contacts`,
            method:'GET',
        },
    };
}
