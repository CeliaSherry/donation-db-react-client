import { RSAA } from 'redux-api-middleware';


export function getDonor(donorId){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `http://localhost:8080/api/donors/${donorId}`,
            method:'GET',
        },
    };
}