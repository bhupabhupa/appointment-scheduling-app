import React, { Component, useEffect, useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
//import * as userAction from '../../../actions/userAction';

import FormFields from '../../FormFields/FormFields';
import resetFields from './resetFields';
import { getUser, resetPassword } from '../../../actions/userAction';

const ResetPassword = (props) => {
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const renderFields = () => {
		return resetFields.map((item) => {
			return (
				<Field component={FormFields} {...item} />
			)
		})
    }

    useEffect(() => {
        props.dispatch(getUser(props.match.params.user_id))
        console.log("RESET PASS")
    })

    const handleResetPassword = (val) => {
        if(val.email !== props.user.email) {
            setInvalidEmail(true)
        } else {
            //call props
            setFormSubmitted(true)
            props.dispatch(resetPassword(val))
        }

        
    }

    const renderForm = () => (
        <Form onSubmit={props.handleSubmit(handleResetPassword)}>
                <Form.Text className="text-white bg-danger">
					{invalidEmail && 'Invalid Email'}
				</Form.Text>
                {renderFields()}
                <Field component="input" type="hidden" name="validEmail" />
                <Button variant="primary" type="submit" >
                    Reset
                </Button>
            </Form>
    )

    const renderSubmitSuccess = () => (
        <Form.Text>
            Your password has changed. Click <Link to="/">here</Link> to login again.
		</Form.Text>
    )

    return (
        <Card style={{ padding: '10px', margin: '50px auto', width: '60%' }}>
            <Card.Title className="text-center">Reset Password</Card.Title>
            {!formSubmitted && renderForm()}
            {!invalidEmail && formSubmitted && renderSubmitSuccess()}
        </Card>
    );
}






function validate(values) {
	const errors = {};
    
    if (values.password !== values.confirm_password) {
		errors.confirm_password = 'Confirm password does not match'
    }
    
	resetFields.map(({ label, name }) => {
		if (!values[name]) {
			errors[name] = `${label} is required`;
		}
	});

	return errors;
}

function mapStateToProps(state, props) {
    console.log("RESET PASS : ", state)
    const { user } = state.userReducer
    
	return {
		user
	}
}

export default connect(mapStateToProps, null)(reduxForm({
	validate,
	form: 'resetForm',
	destroyOnUnmount: true
})(ResetPassword));


// class ResetPassword extends Component {
//     state = {
//         validEmail : ''
//     }

//     componentDidMount() {
//         this.props.dispatch(getUser(this.props.match.params.user_id))
//         //this.setState({validEmail : user.email})
//         // console.log("RESET PASS :",this.props.user, this.props.match.params.user_id)
//         // if(this.props.user) {
//         //     this.props.initialize({validEmail : this.props.user.email});
//         // }
        
//     }
	
// 	renderFields = () => {
// 		return resetFields.map((item) => {
// 			return (
// 				<Field component={FormFields} {...item} />
// 			)
// 		})
//     }
    
//     handleResetPassword = (val) => {
//         console.log("RESET PASS : ", val);
//     }

// 	render() {
// 		return (
// 			<Card style={{ padding: '10px', margin: '50px auto', width: '60%' }}>
// 				<Card.Title className="text-center">Reset Password</Card.Title>
// 				<Form onSubmit={this.props.handleSubmit(this.handleResetPassword)}>
// 					{this.renderFields()}
//                     <Field component="input" type="hidden" name="validEmail" />
// 					<Button variant="primary" type="submit" >
// 						Reset
//                     </Button>
// 				</Form>
// 			</Card>
// 		);
// 	}
// }