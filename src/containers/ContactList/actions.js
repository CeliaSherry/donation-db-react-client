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

export function getAllContactsSortedAscendingName(){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `http://localhost:8080/api/contacts?sortParam=ascendingName`,
            method:'GET',
        },
    };
}

export function getAllContactsSortedDescendingName(){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `http://localhost:8080/api/contacts?sortParam=descendingName`,
            method:'GET',
        },
    };
}

export function getAllContactsSortedAscendingState(){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `http://localhost:8080/api/contacts?sortParam=ascendingState`,
            method:'GET',
        },
    };
}

export function getAllContactsSortedDescendingState(){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `http://localhost:8080/api/contacts?sortParam=descendingState`,
            method:'GET',
        },
    };
}


export function getAllContactsGroupedByInstitution(){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `http://localhost:8080/api/contacts?sortParam=institution`,
            method:'GET',
        },
    };
}

export function deleteContact(contactId){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `http://localhost:8080/api/contact/${contactId}`,
            method:'DELETE',
        },
    };
}