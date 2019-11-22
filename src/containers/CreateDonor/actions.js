import { RSAA } from 'redux-api-middleware';


export function createDonor(donorName){
    console.log(donorName);
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            endpoint: `http://localhost:8080/api/donors`,
            body:    JSON.stringify({
               donorName: donorName 
              }),
            method:'POST',
        },
    };
}