import axios from 'axios';
import { SERVER_URL, ADD_MEETING, VIEW_MEETINGS} from './constants';
import { reset } from 'redux-form';
import {compareMeetingDate, sortObject} from '../utils/commons';

export const addMeeting = (values, event_id, user_id) => async dispatch => {
    //values.meetingDate = new Date(values.meetingDate);
    let res = await axios.post(`${SERVER_URL}/api/v1/meeting/add`, {...values, event_id, user_id});
    dispatch({ type: ADD_MEETING, payload: res.data });
    dispatch(reset('addMeeting'));
};

export const viewMeetings = (user_id, dated) => async dispatch => {
    const res = await axios.get(`${SERVER_URL}/api/v1/meeting/list/${user_id}/${dated}`);
	dispatch({ type: VIEW_MEETINGS, payload: res.data });
};
