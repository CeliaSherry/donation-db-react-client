import { RSAA } from 'redux-api-middleware';


export function getDonationsForDonor(donorId){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `http://localhost:8080/api/donor/${donorId}/donations`,
            method:'GET',
        },
    };
}


export function deleteDonation(donationId){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `http://localhost:8080/api/donation/${donationId}`,
            method:'DELETE',
        },
    };
}