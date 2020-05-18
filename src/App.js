import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/authentication/Login/Login';
import Dashboard from './components/landing/Dashboard/Dashboard';
import ScheduleMeeting from './components/schedule/ScheduleMeeting/ScheduleMeeting';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-calendar/dist/Calendar.css';
import {Container} from 'react-bootstrap';
import ForgotPassword from './components/authentication/ForgotPassword/ForgotPassword';
import SignUp from './components/authentication/SignUp/SignUp';

import { connect } from 'react-redux';
import * as userAction from './actions/userAction';
import ResetPassword from './components/authentication/ResetPassword/ResetPassword';

class App extends Component {
	state = {
		signUpFormSubmitted: false
	}

	handleSubmit = (event) => {
        //event.preventDefault();
		alert('submitted')
		//this.setState({loggedIn: true})
	}

	onFormSubmit = async (val, saveUser, history) => {
		this.setState({signUpFormSubmitted: true})
	}

	render() {		
		return (
			<Container style={{paddingTop: '50px'}}>
				<BrowserRouter>
				<Switch>
				<Route path="/" exact component={() => <Login />}/>
				<Route path="/forgot_password" component={ForgotPassword} />
				<Route path="/new_user" component={() => <SignUp  />} />
				<Route path="/dashboard" component={Dashboard} />				
				<Route path="/reset_password/:user_id" exact component={ResetPassword} />

				<Route path="/meeting/:user_id" exact component={ScheduleMeeting} />
				<Redirect to="/" />
				</Switch>
				</BrowserRouter>
			</Container>
				
				
		);
	}
	
}



function mapStateToProps({userReducer}, props) {
	const { user, loggedIn } = userReducer
	return {
		user,
		loggedIn
	}
}

export default connect(mapStateToProps, userAction)( App);
