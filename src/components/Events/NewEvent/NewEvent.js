import React, { Component } from 'react';
import { Modal, Button, Card, Form, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Field, reduxForm, change } from 'redux-form';
import FormFields from '../../FormFields/FormFields';


class NewEvent extends Component {

    state = {
        selected15 : false,
        selected30 : false,
        selected45 : false,
        selected60 : false
    }

    componentDidUpdate(prevProps) {
        if(prevProps.selectedEvent !== this.props.selectedEvent) {
        
        const {event_name, duration, _id} = this.props.selectedEvent;
        if(event_name !== null && duration !== null) {
            //this.props.initialize({'addEvent', 'event_name', event_name})
            this.selectedBox(duration);
            let custom_val = '';
            if(duration !== 15 && duration !== 30 && duration !== 45 && duration !== 60) {
                custom_val = duration
            }
            this.props.initialize({event_name : event_name, duration: duration, custom_val: custom_val, _id});
            
        }
    }
    }

    selectedBox = (val) => {
        if(val) {
            val = val.toString()
        }
        switch (val) {
            case '15':
                this.setState({
                    selected15: true,
                    selected30: false,
                    selected45: false,
                    selected60: false
                });
                this.props.dispatch(change('addEvent', 'duration', 15));
                this.props.dispatch(change('addEvent', 'custom_val', ''));
                break;
                case '30':
                    this.setState({
                        selected15: false,
                        selected30: true,
                        selected45: false,
                        selected60: false
                    });
                    this.props.dispatch(change('addEvent', 'duration', 30));
                    this.props.dispatch(change('addEvent', 'custom_val', ''));
                    break;

                    case '45':
                this.setState({
                    selected15: false,
                    selected30: false,
                    selected45: true,
                    selected60: false
                });
                this.props.dispatch(change('addEvent', 'duration', 45));
                this.props.dispatch(change('addEvent', 'custom_val', ''));
                break;

                case '60':
                this.setState({
                    selected15: false,
                    selected30: false,
                    selected45: false,
                    selected60: true
                });
                this.props.dispatch(change('addEvent', 'duration', 60));
                this.props.dispatch(change('addEvent', 'custom_val', ''));
                break;
        
            default:
                this.setState({
                    selected15: false,
                    selected30: false,
                    selected45: false,
                    selected60: false
                });
                this.props.dispatch(change('addEvent', 'duration', 0));
                break;
        }
        
        
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={() => this.props.handleAddEvent('close')}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.actionType} Event Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Card style={{padding: '10px'}}>
        <Form onSubmit={this.props.handleSubmit((val) => this.props.addEvent(val, this.props.actionType))}>
                <Form.Group controlId="formBasicEmail">
                    <Field component={FormFields} type="text" label="Event name" placeholder="Enter Event" name="event_name" />
                    <Field component="input" type="hidden" name="duration"  />
                    <Field component="input" type="hidden" name="_id"  />
                </Form.Group>
                <ListGroup horizontal>
                    <ListGroup.Item style={{cursor: 'pointer', border: this.state.selected15 ? '1px solid #000' : ''}} onClick={() => this.selectedBox('15')}>15</ListGroup.Item>
                    <ListGroup.Item style={{cursor: 'pointer', border: this.state.selected30 ? '1px solid #000' : ''}} onClick={() => this.selectedBox('30')}>30</ListGroup.Item>
                    <ListGroup.Item style={{cursor: 'pointer', border: this.state.selected45 ? '1px solid #000' : ''}} onClick={() => this.selectedBox('45')}>45</ListGroup.Item>
                    <ListGroup.Item style={{cursor: 'pointer', border: this.state.selected60 ? '1px solid #000' : ''}} onClick={() => this.selectedBox('60')}>60</ListGroup.Item>
                    <ListGroup.Item onClick={() => this.selectedBox('0')}>
                        <Field className="form-control" component="input" type="number" placeholder="custom" name="custom_val" maxLength="2" />
                    </ListGroup.Item>
                </ListGroup>

                <Button type="submit" variant="primary" style={{marginTop: '5px'}}>
            Save
          </Button>
            </Form>
        </Card>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={() => this.props.handleAddEvent('close')}>
            Close
          </Button>
          <Button type="submit" variant="primary">
            Save
          </Button>
        </Modal.Footer> */}
      </Modal>
        )
    }
};

function validate(values) {
	const errors = {};
	if (!values.event_name) {
        errors.event_name = `Event name is required`;
    }
    if (!values.duration && !values .custom_val) {
        errors.event_name = `Select duration`;
    }

	return errors;
}

export default (reduxForm({
    validate,
    form: 'addEvent',
    destroyOnUnmount: true
})(NewEvent));