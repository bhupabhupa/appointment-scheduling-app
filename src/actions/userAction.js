import axios from 'axios';
import { SERVER_URL, ADD_USER, USER_INFO, LOGGED_IN, GET_USER, RESET_PASSWORD } from './constants';
import { history } from '../utils/history';

export const saveUser = (values) => async dispatch => {
	const res = await axios.post(`${SERVER_URL}/api/v1/user`, values);

	dispatch({ type: ADD_USER, payload: res.data });
};

export const getUser = (user_id) => async dispatch => {
	const res = await axios.get(`${SERVER_URL}/api/v1/user/${user_id}`);
	dispatch({ type: GET_USER, payload: res.data });
};


export const userLogin = (values) => async dispatch => {
    const res = await axios.post(`${SERVER_URL}/api/v1/user/login`, values);
    if(res.data.user) {
        history.push("/dashboard")
        sessionStorage.setItem('user', JSON.stringify(res.data.user));
        sessionStorage.setItem('loggedIn', true);
        dispatch({ type: USER_INFO, payload: res.data });
    }
};

export const sendPasswordMail = (email) => async dispatch => {
    const res = await axios.get(`${SERVER_URL}/api/v1/user/send_mail/${email}`);
    dispatch({ type: RESET_PASSWORD, payload: res.data });
};

export const resetPassword = (val) => async dispatch => {
	const res = await axios.put(`${SERVER_URL}/api/v1/user/reset_password/`, val);
    dispatch({ type: RESET_PASSWORD, payload: res.data });
};