import { RSAA } from 'redux-api-middleware';


export function createDonor(donorName,email,phone,address,state,city,zipCode){
    
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            endpoint: `https://salty-citadel-44905.herokuapp.com/api/donors`,
            body:    JSON.stringify({
               donorName: donorName,
               email: email,
               phone: phone,
               address: address,
               state: state,
               city: city,
               zipCode:zipCode
              }),
            method:'POST',
        },
    };
}



export function createDonationForDonor(donorId,donationAmount,donationDate,note){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            endpoint: `https://salty-citadel-44905.herokuapp.com/api/donor/${donorId}/donation`,
            body:    JSON.stringify({
               donationAmount: donationAmount,
               donationDate: donationDate,
               note: note,
              }),
            method:'POST',
        },
    };
}



export function createDonorWithContact(donorName, donorEmail, donorPhone, donorAddress, donorState, donorCity, donorZipCode,
    contactName,contactEmail,contactPhone,contactAddress,contactState, contactCity,contactZipCode,
    institutionName,institutionAddress,institutionState,institutionCity,institutionZipCode ){

    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            endpoint: `https://salty-citadel-44905.herokuapp.com/api/donors/with_details`,
            body:    JSON.stringify({
                donorName: donorName,
                email: donorEmail,
                phone: donorPhone,
                address: donorAddress,
                state: donorState,
                city: donorCity,
                zipCode: donorZipCode,
                contact: {
                    contactName: contactName,
                    email: contactEmail,
                    phone: contactPhone,
                    address: contactAddress,
                    state: contactState,
                    city: contactCity,
                    zipCode: contactZipCode,
                    institution:{
                        institutionName: institutionName,
                        address: institutionAddress,
                        state: institutionState,
                        city: institutionCity,
                        zipCode: institutionZipCode,
                    }
                }
              }),
            method:'POST',
        },
    };
}


export function getInstitution(institutionName){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `https://salty-citadel-44905.herokuapp.com/api/institution/${institutionName}`,
            method:'GET',
        },
    };
}

export function getAllInstitutions(){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `https://salty-citadel-44905.herokuapp.com/api/institutions`,
            method:'GET',
        },
    };
}

export function getAllContacts(){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `https://salty-citadel-44905.herokuapp.com/api/contacts`,
            method:'GET',
        },
    };
}

export function addDonorToExistingContact(contactId, donorName, donorEmail, donorPhone, donorAddress, donorState, donorCity, donorZipCode){
    return{
        [RSAA]:{
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            endpoint: `https://salty-citadel-44905.herokuapp.com/api/contact/${contactId}/donor`,
            body:    JSON.stringify({
                donorName: donorName,
                email: donorEmail,
                phone: donorPhone,
                address: donorAddress,
                state: donorState,
                city: donorCity,
                zipCode: donorZipCode,
              }),
            method:'POST',
        },
    };
}
