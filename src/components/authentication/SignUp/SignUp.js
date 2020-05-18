import React, { Component } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as userActions from '../../../actions/userAction';
import SignUpForm from '../SignUpForm/SignUpForm';
import SignUpSuccess from '../SignUpForm/SignUpSuccess';

class SignUp extends Component {
    state = {
        signUpFormSubmitted: false
    }
    
    onFormSubmit = async (val, saveUser) => {
		this.setState({signUpFormSubmitted: true})
		//console.log("history : ",history)
		await saveUser(val);
		//return <Redirect to="/" />;
		//this.props.history.push("/");
	}

    renderContent = () => {
        if(this.state.signUpFormSubmitted) {
            return (<SignUpSuccess />)
        } else {
            return (
                <SignUpForm onFormSubmit={this.onFormSubmit} />
            )
        }
    }

    render() {
        return (
            <Card style={{padding: '10px', margin: '50px auto', width: '60%' }}>
                {this.renderContent()}
            </Card>           
        )
    }

};

export default SignUp;

// function mapStateToProps({ }, ) {
// 	return {}
// }

// export default connect(null, userActions)(reduxForm({
//     form: 'signUpForm',
//     destroyOnUnmount: false
// })(signUp));