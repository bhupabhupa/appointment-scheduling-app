import { ADD_USER, USER_INFO, LOGGED_IN, GET_USER, RESET_PASSWORD } from '../actions/constants';

export default function (state = {}, action) {
    
    switch (action.type) {
        case ADD_USER:
            return state;
        case USER_INFO:
            //console.log("action.payload : ", action.payload)
            return {
                //action.payload,
                user: action.payload.user,
                token: action.payload.token,
                loggedIn: true
            }
        case GET_USER:
            console.log("RESET PASS : ", action.payload)
            return {
                user: action.payload.user
            }
        case RESET_PASSWORD:
            return state;
        default:
            return state;
    }
}