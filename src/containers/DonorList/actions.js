// import {CALL_API} from '../../api';
import callAPI from '../../api';
import { RSAA } from 'redux-api-middleware';
import * as Types from '../Donors/actionTypes';

// export function createDonor(values){
//     const {firstName, lastName, }
// }


// export function getAllDonors(){
//     console.log("func");
//     return{
//         [CALL_API]:{
//             types:[
//                 Types.GET_DONORS_REQUEST,
//                 Types.GET_DONORS_SUCCESS,
//                 Types.GET_DONORS_FAILURE,
//             ],
//             endpoint: `/donors`,
//             method:'GET',
//         },
//     };
// }


export function getAllDonors(){
    return{
        [RSAA]:{
            // types:[
            //     Types.GET_DONORS_REQUEST,
            //     Types.GET_DONORS_SUCCESS,
            //     Types.GET_DONORS_FAILURE,
            // ],
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            endpoint: `http://localhost:8080/api/donors`,
            method:'GET',
        },
    };
}