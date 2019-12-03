import { RSAA } from 'redux-api-middleware';

export function getAllDonors(donorName,email,phone,address,city,state,zip){
   var url = `http://localhost:8080/api/donors`
    if(donorName!== undefined && email!== undefined && phone!== undefined && address!== undefined && city!== undefined && state!== undefined && zip!== undefined){
        url = `http://localhost:8080/api/donors?name=${donorName}&email=${email}&phone=${phone}&address=${address}&city=${city}&state=${state}&zip=${zip}`
    }
    return{
        [RSAA]:{

            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: url,
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