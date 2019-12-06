import { RSAA } from 'redux-api-middleware';


export function getAllDonations(donorName,month,year,thanks,contact,institution){
    var url = `http://localhost:8080/api/donations`
    if(donorName!== undefined && month!== undefined && year!== undefined && thanks!== undefined && contact!== undefined && institution!== undefined){
        url = `http://localhost:8080/api/donations?name=${donorName}&month=${month}&=${month}&year=${year}&contact=${contact}&institution=${institution}`
    }
    return{
        [RSAA]:{

            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: url,
            method:'GET',
        },
    };


}

export function deleteDonation(donationId) {
    return {
        [RSAA]: {
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `http://localhost:8080/api/donation/${donationId}`,
            method: 'DELETE',
        },
    };
}