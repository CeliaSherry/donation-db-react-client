import { RSAA } from 'redux-api-middleware';


export function getDonor(donorId){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `https://salty-citadel-44905.herokuapp.com/api/donors/${donorId}`,
            method:'GET',
        },
    };
}

export function updateDonor(donorId, donorName,email,phone,address,state,city,zip,contact){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            endpoint: `https://salty-citadel-44905.herokuapp.com/api/donor/${donorId}`,
            body:    JSON.stringify({
                donorName: donorName,
                email: email,
                phone: phone,
                address: address,
                state: state,
                city: city,
                zipCode: zip,
                contact: contact
            }),
            method:'PUT',
        },
    };
}


export function deleteDonor(donorId){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `https://salty-citadel-44905.herokuapp.com/api/donor/${donorId}`,
            method:'DELETE',
        },
    };
}
