import { RSAA } from 'redux-api-middleware';


export function getFilteredDonors(donorName,donationMonth,donationYear,thankYouSent,contactName,institutionName){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `http://localhost:8080/api/search?name=${donorName}&month=${donationMonth}&year=${donationYear}&thankYou=${thankYouSent}&contact=${contactName}&institution=${institutionName}`,
            method:'GET',
        },
    };
}
