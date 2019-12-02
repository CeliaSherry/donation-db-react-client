import { RSAA } from 'redux-api-middleware';


export function getFilteredDonors(donorName,email,phone,address,state,city,zip){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `http://localhost:8080/api/donors?name=${donorName}&email=${email}&phone=${phone}&address=${address}&state=${state}&city=${city}&zip=${zip}`,
            method:'GET',
        },
    };
}
