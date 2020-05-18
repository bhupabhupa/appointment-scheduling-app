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
	
	// onLogin = async (val) => {
	// 	//event.preventDefault();
	// 	await this.props.userLogin(val);
	// 	console.log("USER : ", this.props.user)
	// 	if(this.props.user) {
	// 		console.log("USER 1: ", this.props.loggedIn)
	// 		//this.setState({loggedIn: true})
	// 		//return (<Redirect to="/dashboad" />)
	// 	}
	// }

	onFormSubmit = async (val, saveUser, history) => {
		this.setState({signUpFormSubmitted: true})
		//console.log("history : ",history)
		//await saveUser(val, history);
		//return <Redirect to="/" />;
		//this.props.history.push("/");
	}

	render() {
		console.log("loggedIn : ", this.props.loggedIn)
		
		return (
			<Container style={{paddingTop: '50px'}}>
				<BrowserRouter>
				<Switch>
				<Route path="/" exact component={() => <Login />}/>
				<Route path="/forgot_password" component={ForgotPassword} />
				<Route path="/new_user" component={() => <SignUp  />} />
				<Route path="/dashboard" component={Dashboard} />
				{/* {this.state.loggedIn &&
					<Route path="/dashboard" exact component={Dashboard} />
				} */}
				
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
