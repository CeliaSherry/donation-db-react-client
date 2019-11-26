import { RSAA } from 'redux-api-middleware';


export function getDonation(donationId){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `http://localhost:8080/api/donations/${donationId}`,
            method:'GET',
        },
    };
}

export function updateDonation(donationId, amount,date,note,donor){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            endpoint: `http://localhost:8080/api/donation/${donationId}`,
            body:    JSON.stringify({
                donationAmount: amount,
                donationDate: date,
                note: note,
                donor: donor
            }),
            method:'PUT',
        },
    };
}