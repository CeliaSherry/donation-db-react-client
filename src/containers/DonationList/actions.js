import { RSAA } from 'redux-api-middleware';


export function getDonationsForDonor(donorId){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `https://salty-citadel-44905.herokuapp.com/api/donor/${donorId}/donations`,
            method:'GET',
        },
    };
}


export function deleteDonation(donationId){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `https://salty-citadel-44905.herokuapp.com/api/donation/${donationId}`,
            method:'DELETE',
        },
    };
}
