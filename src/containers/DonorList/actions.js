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


export function getAllDonorsSortedAscending(){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `http://localhost:8080/api/donors?sortOrder=ascending`,
            method:'GET',
        },
    };
}

export function getAllDonorsSortedDescending(){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `http://localhost:8080/api/donors?sortOrder=descending`,
            method:'GET',
        },
    };
}

export function deleteDonor(donorId){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `http://localhost:8080/api/donor/${donorId}`,
            method:'DELETE',
        },
    };
}