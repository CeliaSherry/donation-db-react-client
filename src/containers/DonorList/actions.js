import { RSAA } from 'redux-api-middleware';

export function getAllDonors(donorName,email,phone,address,city,state,zip, contact){
   var url = `https://salty-citadel-44905.herokuapp.com/api/donors`
    if(donorName!== undefined && email!== undefined && phone!== undefined && address!== undefined && city!== undefined && state!== undefined && zip!== undefined){
        url = `https://salty-citadel-44905.herokuapp.com/api/donors?name=${donorName}&email=${email}&phone=${phone}&address=${address}&city=${city}&state=${state}&zip=${zip}&contact=${contact}`
    }
    return{
        [RSAA]:{

            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: url,
            method:'GET',
        },
    };
}

export function getAllDonorsSortedAscendingName(){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `https://salty-citadel-44905.herokuapp.com/api/donors?sortParam=ascendingName`,
            method:'GET',
        },
    };
}

export function getAllDonorsSortedDescendingName(){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `https://salty-citadel-44905.herokuapp.com/api/donors?sortParam=descendingName`,
            method:'GET',
        },
    };
}

export function getAllDonorsGroupedByContact(){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `https://salty-citadel-44905.herokuapp.com/api/donors?sortParam=contact`,
            method:'GET',
        },
    };
}

export function deleteDonor(donorId){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `https://salty-citadel-44905.herokuapp.com/api/donor/${donorId}`,
            method:'DELETE',
        },
    };
}
