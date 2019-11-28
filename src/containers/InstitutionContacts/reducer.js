import * as Types from '../InstitutionContacts/actionTypes';

const defaultState = {
    loading: true,
};



export default function institutionsContactListReducer (state = {}, action){
    switch(action.type){
        case Types.GET_INSTITUTIONS_CONTACT_REQUEST:
        return { loading: true};
        case Types.GET_INSTITUTIONS_CONTACT_SUCCESS:
        return { loading: false};
        case Types.GET_INSTITUTIONS_CONTACT_FAILURE:
        return { loading: false};
        default:
        return state;
    }
};