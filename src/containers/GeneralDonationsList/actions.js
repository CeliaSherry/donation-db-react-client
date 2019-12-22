import { RSAA } from 'redux-api-middleware';


export function getAllDonations(donorName,month,year,thanks,contact,institution){
    var url = `https://salty-citadel-44905.herokuapp.com/api/donations`
    if(donorName!== undefined && month!== undefined && year!== undefined && thanks!== undefined && contact!== undefined && institution!== undefined){
        url = `https://salty-citadel-44905.herokuapp.com/api/donations?name=${donorName}&month=${month}&=${month}&year=${year}&thanks=${thanks}&contact=${contact}&institution=${institution}`
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
            endpoint: `https://salty-citadel-44905.herokuapp.com/api/donation/${donationId}`,
            method: 'DELETE',
        },
    };
}
