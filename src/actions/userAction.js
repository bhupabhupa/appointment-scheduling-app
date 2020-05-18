import axios from 'axios';
import { SERVER_URL, ADD_USER, USER_INFO, LOGGED_IN, GET_USER, RESET_PASSWORD } from './constants';
import { history } from '../utils/history';

export const saveUser = (values) => async dispatch => {
    console.log("values : ", values)
	const res = await axios.post(`${SERVER_URL}/api/v1/user`, values);

	dispatch({ type: ADD_USER, payload: res.data });
};

export const getUser = (user_id) => async dispatch => {
    console.log("user_id : ", user_id)
	const res = await axios.get(`${SERVER_URL}/api/v1/user/${user_id}`);
    console.log("res : ", res)
	dispatch({ type: GET_USER, payload: res.data });
};


export const userLogin = (values) => async dispatch => {
    console.log("values 1: ", values)
    const res = await axios.post(`${SERVER_URL}/api/v1/user/login`, values);
    if(res.data.user) {
        console.log("History : ", history)
        history.push("/dashboard")
        //history.goForward();
        sessionStorage.setItem('user', JSON.stringify(res.data.user));
        sessionStorage.setItem('loggedIn', true);
        dispatch({ type: USER_INFO, payload: res.data });
        //dispatch({ type: LOGGED_IN, payload: true });
    }
    //console.log("RESPONSE : ", res.data.user)
    //dispatch({ type: USER_INFO, payload: res.data });
	
};

export const sendPasswordMail = (email) => async dispatch => {
    console.log("EMAIL : ",email)
	const res = await axios.get(`${SERVER_URL}/api/v1/user/send_mail/${email}`);
    console.log("res : ", res)
	dispatch({ type: RESET_PASSWORD, payload: res.data });
};

export const resetPassword = (val) => async dispatch => {
	const res = await axios.put(`${SERVER_URL}/api/v1/user/reset_password/`, val);
    console.log("res : ", res)
	dispatch({ type: RESET_PASSWORD, payload: res.data });
};