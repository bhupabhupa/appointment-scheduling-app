import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import userReducer from './userReducer';
import eventReducer from './eventReducer';
import meetingReducer from './meetingReducer';

export default combineReducers({
    form: reduxForm,
    userReducer,
    eventReducer,
    meetingReducer
});