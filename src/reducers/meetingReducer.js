import { ADD_MEETING, VIEW_MEETINGS } from '../actions/constants';

export default function (state = {}, action) {
    
    switch (action.type) {
        case ADD_MEETING:
            return state;
        case VIEW_MEETINGS:
            console.log("ACTION : ", action.payload)
            return action.payload;
        default:
            return state;
    }
}