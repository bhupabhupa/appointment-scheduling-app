import React, { Component, useEffect, useState } from 'react';
import EventDetails from '../EventDetails/EventDetails';
import { Row, Col, Container, Button, Card, CardDeck } from 'react-bootstrap';
import NewEvent from '../NewEvent/NewEvent';
import { connect } from 'react-redux';
import * as eventAction from '../../../actions/eventAction';
import { reset } from 'redux-form';
import { getUserId } from '../../../utils/commons';
import { Link } from 'react-router-dom';

const EventList = (props) => {

	const [showAddEvent, setAddEvent] = useState(false);
	const [actionType, setActionType] = useState('add');
	const [selectedEvent, setSelectedEvent] = useState({});

	useEffect(() => {
		props.dispatch(eventAction.viewEvents(getUserId()));
		//console.log("USER DATA : ");
	}, [showAddEvent]);

	const handleAddEvent = (event, action, selectedEvent) => {
		console.log(event, action, selectedEvent)
		if (event === 'open') {
			setActionType(action);
			setSelectedEvent(selectedEvent);
			setAddEvent(true);
		} else if (event === 'close') {
			setAddEvent(false)
		}
	}

	const addEvent = (val, event) => {
		props.dispatch(eventAction.addEvent(val, event));
		handleAddEvent('close');
		props.dispatch(reset('addEvent'));
		props.dispatch(eventAction.viewEvents(getUserId()));
	}
	return (
		<div>
			<Container>
				<Row>
					<Col style={{ marginBottom: '5px' }}>
						<Card.Title>My Link</Card.Title>
						<Card.Link>http://localhost:3000/meeting/{props.user_id}</Card.Link>
					</Col>
					<Col md="auto">
						<Button onClick={() => handleAddEvent('open', 'Add', {})}>Add New Event Type</Button>
					</Col>
				</Row>
			</Container>
			<Container>
				<Row>
					{
						props.eventList &&
						props.eventList.map((event) => (
							<Col sm="4" style={{ marginBottom: '10px' }}><EventDetails isUser={true} event={event} showEvent={handleAddEvent} /></Col>
						))
					}
				</Row>
			</Container>
			{/* <CardDeck>
			{
						props.eventList &&
						props.eventList.map((event) => (
							<EventDetails isUser={true} event={event} showEvent={handleAddEvent} />
						))
					}
			</CardDeck> */}

			<NewEvent show={showAddEvent} selectedEvent={selectedEvent} handleAddEvent={handleAddEvent} addEvent={addEvent} actionType={actionType} />
		</div>
	)
}


function mapStateToProps(state, props) {
	return {
		eventList: state.eventReducer.eventList,
		user_id: JSON.parse(sessionStorage.getItem('user'))._id
	}
}


export default connect(mapStateToProps, null)(EventList);