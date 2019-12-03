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

export function getFilteredDonors(donorName,email,phone,address,state,city,zip){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `http://localhost:8080/api/donor/search?name=${donorName}&email=${email}&phone=${phone}&address=${address}&state=${state}&city=${city}&zip=${zip}`,
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