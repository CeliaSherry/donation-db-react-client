import { RSAA } from 'redux-api-middleware';


export function getAllContacts(){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `http://localhost:8080/api/contacts`,
            method:'GET',
        },
    };
}