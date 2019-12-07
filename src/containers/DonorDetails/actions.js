import { RSAA } from 'redux-api-middleware';


export function getDonor(donorId){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `http://localhost:8080/api/donors/${donorId}`,
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
            endpoint: `http://localhost:8080/api/donor/${donorId}`,
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