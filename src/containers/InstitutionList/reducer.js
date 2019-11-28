import * as Types from '../Institutions/actionTypes';

const defaultState = {
    loading: true,
};



export default function institutionsListReducer (state = {}, action){
    switch(action.type){
        case Types.GET_INSTITUTIONS_REQUEST:
        return { loading: true};
        case Types.GET_INSTITUTIONS_SUCCESS:
        return { loading: false};
        case Types.GET_INSTITUTIONS_FAILURE:
        return { loading: false};
        default:
        return state;
    }
};