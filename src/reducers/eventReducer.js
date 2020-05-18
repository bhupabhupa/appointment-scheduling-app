import { ADD_EVENT, VIEW_EVENTS } from '../actions/constants';

export default function (state = {}, action) {
    
    switch (action.type) {
        case ADD_EVENT:
            return state;
        case VIEW_EVENTS:
            console.log("ACTION : ", action.payload)
            return action.payload;
        default:
            return state;
    }
}