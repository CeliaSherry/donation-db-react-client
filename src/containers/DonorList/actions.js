import { RSAA } from 'redux-api-middleware';


export function getAllDonors(){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `http://localhost:8080/api/donors`,
            method:'GET',
        },
    };
}