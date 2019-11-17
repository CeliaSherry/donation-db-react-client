// import {CALL_API} from '../../api';
import callAPI from '../../api';
import { CALL_API } from 'redux-api-middleware';
import * as Types from './actionTypes';

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
    console.log("func");
    return{
        [CALL_API]:{
            types:[
                Types.GET_DONORS_REQUEST,
                Types.GET_DONORS_SUCCESS,
                Types.GET_DONORS_FAILURE,
            ],
            endpoint: `http://localhost:8080/api/donors`,
            method:'GET',
        },
    };
}