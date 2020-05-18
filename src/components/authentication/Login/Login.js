import React, { Component } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as userAction from '../../../actions/userAction';
import loginFields from './loginFields';
import FormFields from '../../FormFields/FormFields';

class Login extends Component {
	state = {
		formSubmitted: false
	}

	renderFields = () => {
		return loginFields.map((item) => {
			return (
				<Field component={FormFields} {...item} />
			)
		})
	}

	onLogin = async (val) => {
		await this.props.userLogin(val);
		if (!this.props.user) {
			this.setState({ formSubmitted: true })
		}
	}

	render() {
		if (sessionStorage.getItem('user')) {
			return <Redirect to="/dashboard" />
		}
		return (
			<Card style={{ padding: '10px', margin: '50px auto', width: '60%' }}>
				<Card.Title className="text-center">Sign in</Card.Title>
				<Form onSubmit={this.props.handleSubmit((val) => this.onLogin(val))}>
					<Form.Text className="text-white bg-danger">
						{this.state.formSubmitted && 'Email or password is incorrect'}
					</Form.Text>
					{this.renderFields()}
					<Button variant="primary" type="submit">
						Login
                    </Button>
					
					<Link to="/forgot_password"><Button variant="outline-primary" style={{marginLeft: '5px', marginRight: '5px'}}>Forgot Password?</Button></Link>
					<Link to="/new_user"><Button variant="outline-primary">New User? Sign Up</Button></Link>
				</Form>
			</Card>
		);
	}
}

function validate(values) {
	const errors = {};

	loginFields.map(({ label, name }) => {
		if (!values[name]) {
			errors[name] = `${label} is required`;
		}
	});

	return errors;
}

function mapStateToProps(state, props) {
	const { user, loggedIn } = state.userReducer
	return {
		user,
		loggedIn
	}
}

export default connect(mapStateToProps, userAction)(reduxForm({
	validate,
	form: 'loginForm',
	destroyOnUnmount: true
})(Login));