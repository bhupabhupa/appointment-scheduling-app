import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import FormFields from '../../FormFields/FormFields';
import { connect } from 'react-redux';
import { sendPasswordMail } from '../../../actions/userAction';

const ForgotPassword = (props) => {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const handleReset = (val) => {
        props.dispatch(sendPasswordMail(val.email))
        setFormSubmitted(true);
    }

    const renderForm = () => (
        <Form onSubmit={props.handleSubmit(handleReset)}>
                <Field component={FormFields} type="email" label="Enter resigtered email address" placeholder="Enter email" name="email" />
                <Button variant="primary" type="submit" >
                    Send
                </Button>
                <Link to="/" style={{marginLeft: '10px'}}>
                    <Button variant="primary" type="submit" >
                        Cancel
                    </Button>
                    </Link>
            </Form>
    )

    const renderSubmitSuccess = () => (
        <Form.Text>
            If email is registered you will receive reset password link. Click <Link to="/">here</Link> to login again.
		</Form.Text>
    )

    return (
        <Card style={{padding: '10px', margin: '50px auto', width: '60%' }}>
            <Card.Title className="text-center">Reset Password</Card.Title>
            {!formSubmitted && renderForm()}
            {formSubmitted && renderSubmitSuccess()}
    </Card>
    )
};


function validate(values) {
	const errors = {};
	if (!values.email) {
        errors.email = `Email is required`;
    }
	return errors;
}

export default connect(null, { sendPasswordMail })(reduxForm({
	validate,
	form: 'forgotForm',
	destroyOnUnmount: true
})(ForgotPassword));