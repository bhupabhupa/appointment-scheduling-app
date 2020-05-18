import axios from 'axios';
import { SERVER_URL, ADD_EVENT, VIEW_EVENTS, UPDATE_EVENT} from './constants';
import { reset } from 'redux-form';
import { getUserId } from '../utils/commons';

export const addEvent = (values, event) => async dispatch => {
    
    let user_id = getUserId();
    let {event_name, duration, custom_val, _id} = values;
    if(custom_val && custom_val.trim().length > 0) {
        duration = custom_val;
    }
    let res;
    if(event === 'Add') {
        res = await axios.post(`${SERVER_URL}/api/v1/event/add`, {event_name, duration, user_id},{headers:{
            "x-token":sessionStorage.getItem("token")
        }});
        dispatch({ type: ADD_EVENT, payload: res.data });
    } else if(event === 'Edit') {
        res = await axios.put(`${SERVER_URL}/api/v1/event/update`, {event_name, duration, user_id, _id},{headers:{
            "x-token":sessionStorage.getItem("token")
        }});
        dispatch({ type: UPDATE_EVENT, payload: res.data });
    }

    dispatch(reset('addEvent'));
    
};

export const viewEvents = (user_id) => async dispatch => {
    //let user_id = getUserId();
	const res = await axios.get(`${SERVER_URL}/api/v1/event/list/${user_id}`);
	dispatch({ type: VIEW_EVENTS, payload: res.data });
};
