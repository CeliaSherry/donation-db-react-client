import { RSAA } from 'redux-api-middleware';


export function getAllInstitutions(){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `http://localhost:8080/api/institutions`,
            method:'GET',
        },
    };
}