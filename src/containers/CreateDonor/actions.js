
import { RSAA } from 'redux-api-middleware';


export function createDonor(donorName,email,phone,address,state,city,zip,institution){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            endpoint: `http://localhost:8080/api/donors`,
            body:    JSON.stringify({
               donorName: donorName,
               email: email,
               phone: phone,
               address: address,
               state: state,
               city: city,
               zip:zip,
               institution: institution, 
              }),
            method:'POST',
        },
    };
}