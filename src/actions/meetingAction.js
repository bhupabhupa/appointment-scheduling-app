import axios from 'axios';
import { SERVER_URL, ADD_MEETING, VIEW_MEETINGS} from './constants';
import { reset } from 'redux-form';
import {compareMeetingDate, sortObject} from '../utils/commons';

export const addMeeting = (values, event_id, user_id) => async dispatch => {
    //values.meetingDate = new Date(values.meetingDate);
    console.log("ADDING METING....", {...values, event_id, user_id})
    let res = await axios.post(`${SERVER_URL}/api/v1/meeting/add`, {...values, event_id, user_id});
    dispatch({ type: ADD_MEETING, payload: res.data });
    dispatch(reset('addMeeting'));
};

export const viewMeetings = (user_id, dated) => async dispatch => {
    //let user_id = getUserId();
    console.log("viewMeeting : ", user_id)
	const res = await axios.get(`${SERVER_URL}/api/v1/meeting/list/${user_id}/${dated}`);
    console.log("viewMeeting : ", res.data.meetingList)
    //console.log("viewMeeting 1: ", sortObject(res.data.meetingList));
    // let result = res.data.meeting.sort(compareMeetingDate)
    //console.log("viewMeeting result : ", result)
	dispatch({ type: VIEW_MEETINGS, payload: res.data });
};
