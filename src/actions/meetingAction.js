import axios from 'axios';
import { SERVER_URL, ADD_MEETING, VIEW_MEETINGS} from './constants';
import { reset } from 'redux-form';

export const addMeeting = (values, event_id, user_id) => async dispatch => {
    //values.meetingDate = new Date(values.meetingDate);
    let res = await axios.post(`${SERVER_URL}/api/v1/meeting/add`, {...values, event_id, user_id},{headers:{
        "x-token":sessionStorage.getItem("token")
    }});
    dispatch({ type: ADD_MEETING, payload: res.data });
    dispatch(reset('addMeeting'));
};

export const viewMeetings = (user_id, dated, page_no) => async dispatch => {
    const res = await axios.get(`${SERVER_URL}/api/v1/meeting/list/${user_id}/${dated}/${page_no}`,{headers:{
        "x-token":sessionStorage.getItem("token")
    }});
	dispatch({ type: VIEW_MEETINGS, payload: res.data });
};


export const viewMeetingsSlots = (user_id, dated) => async dispatch => {
    const res = await axios.get(`${SERVER_URL}/meeting/list/${user_id}/${dated}`);
	dispatch({ type: VIEW_MEETINGS, payload: res.data });
};
