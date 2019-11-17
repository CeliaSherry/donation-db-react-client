import * as Types from '../Donors/actionTypes';

const defaultState = {
    loading: true,
};



export default function donorsListReducer (state = {}, action){
    switch(action.type){
        case Types.GET_DONORS_REQUEST:
        return { loading: true};
        case Types.GET_DONORS_SUCCESS:
        return { loading: false};
        case Types.GET_DONORS_FAILURE:
        return { loading: false};
        default:
        return state;
    }
};