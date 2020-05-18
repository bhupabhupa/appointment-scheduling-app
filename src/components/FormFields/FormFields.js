//SurveyField contains logic to render a single label and text input
import React from 'react';
import { Form } from 'react-bootstrap';

export default ({ input, label, placeholder, type, meta: { error, touched } }) => {
    return (
        <Form.Group>
            <Form.Label>{label}</Form.Label>
            <Form.Control {...input} type={type} placeholder={placeholder} />
            <Form.Text className="text-danger">
                {touched && error}
            </Form.Text>
        </Form.Group>
    );
};
