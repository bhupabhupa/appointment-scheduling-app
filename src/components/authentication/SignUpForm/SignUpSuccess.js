import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const signUpSuccess = () => (
    <div>
        <Card.Title>Thank you for registration</Card.Title>
        <Link to="/">Login</Link>
    </div>
    

);

export default signUpSuccess;