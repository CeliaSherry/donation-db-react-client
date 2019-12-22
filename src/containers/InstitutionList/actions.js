import { RSAA } from 'redux-api-middleware';


export function getAllInstitutions(){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `https://salty-citadel-44905.herokuapp.com/api/institutions`,
            method:'GET',
        },
    };
}

export function deleteInstitution(institutionId){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `https://salty-citadel-44905.herokuapp.com/api/institution/${institutionId}`,
            method:'DELETE',
        },
    };
}


export function getAllInstitutionsSortedAscendingName(){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `https://salty-citadel-44905.herokuapp.com/api/institutions?sortParam=ascendingName`,
            method:'GET',
        },
    };
}

export function getAllInstitutionsSortedDescendingName(){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `https://salty-citadel-44905.herokuapp.com/api/institutions?sortParam=descendingName`,
            method:'GET',
        },
    };
}

export function getAllInstitutionsSortedAscendingState(){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `https://salty-citadel-44905.herokuapp.com/api/institutions?sortParam=ascendingState`,
            method:'GET',
        },
    };
}

export function getAllInstitutionsSortedDescendingState(){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `https://salty-citadel-44905.herokuapp.com/api/institutions?sortParam=descendingState`,
            method:'GET',
        },
    };
}
