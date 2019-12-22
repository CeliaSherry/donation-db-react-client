import { RSAA } from 'redux-api-middleware';


export function getDonation(donationId){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `https://salty-citadel-44905.herokuapp.com/api/donations/${donationId}`,
            method:'GET',
        },
    };
}

export function updateDonation(donationId, amount,date,note,donor, thanks){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            endpoint: `https://salty-citadel-44905.herokuapp.com/api/donation/${donationId}`,
            body:    JSON.stringify({
                donationAmount: amount,
                donationDate: date,
                note: note,
                donor: donor,
                thankYou: thanks
            }),
            method:'PUT',
        },
    };
}
