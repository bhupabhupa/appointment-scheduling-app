import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as userActions from '../../../actions/userAction';
import FormFields from '../../FormFields/FormFields';
import signUpFields from './signUpFields';

const signUpForm = ({ handleSubmit, onFormSubmit, saveUser }) => {
	const renderFields = () => {
		return signUpFields.map((item) => {
			return (
				<Field component={FormFields} {...item} />
			)
		})
	}

	return (
		<>
			<Card.Title className="text-center">Sign Up</Card.Title>
			<Form onSubmit={handleSubmit((val) => onFormSubmit(val, saveUser))}>
				{renderFields()}
				<Button variant="primary" type="submit" >
					Register
                </Button>
				<Link to="/" style={{ marginLeft: '10px' }}>
					<Button variant="primary" type="submit" >
						Cancel
                    </Button>
				</Link>
			</Form>
		</>)
};

function validate(values) {
	const errors = {};

	if (values.password !== values.confirm_password) {
		errors.confirm_password = 'Confirm password does not match'
	}

	signUpFields.map(({ label, name }) => {
		if (!values[name]) {
			errors[name] = `${label} is required`;
		}
	});

	return errors;
}

export default connect(null, userActions)(reduxForm({
	validate,
	form: 'signUpForm',
	destroyOnUnmount: true
})(signUpForm));