import { RSAA } from 'redux-api-middleware';


export function createDonationForDonor(donorId,donationAmount,donationDate,note, thankYou){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            endpoint: `http://localhost:8080/api/donor/${donorId}/donation`,
            body:    JSON.stringify({
               donationAmount: donationAmount,
               donationDate: donationDate,
               note: note,
                thankYou: thankYou
              }),
            method:'POST',
        },
    };
}


