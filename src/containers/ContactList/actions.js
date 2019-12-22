import { RSAA } from 'redux-api-middleware';


export function getAllContacts(){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `https://salty-citadel-44905.herokuapp.com/api/contacts`,
            method:'GET',
        },
    };
}

export function getAllContactsSortedAscendingName(){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `https://salty-citadel-44905.herokuapp.com/api/contacts?sortParam=ascendingName`,
            method:'GET',
        },
    };
}

export function getAllContactsSortedDescendingName(){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `https://salty-citadel-44905.herokuapp.com/api/contacts?sortParam=descendingName`,
            method:'GET',
        },
    };
}

export function getAllContactsSortedAscendingState(){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `https://salty-citadel-44905.herokuapp.com/api/contacts?sortParam=ascendingState`,
            method:'GET',
        },
    };
}

export function getAllContactsSortedDescendingState(){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `https://salty-citadel-44905.herokuapp.com/api/contacts?sortParam=descendingState`,
            method:'GET',
        },
    };
}


export function getAllContactsGroupedByInstitution(){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `https://salty-citadel-44905.herokuapp.com/api/contacts?sortParam=institution`,
            method:'GET',
        },
    };
}

export function deleteContact(contactId){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `https://salty-citadel-44905.herokuapp.com/api/contact/${contactId}`,
            method:'DELETE',
        },
    };
}
