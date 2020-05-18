import React, { Component, useState } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import Calendar from 'react-calendar';
import { Field, reduxForm, change } from 'redux-form';
import { TIMING } from '../../../actions/constants';
import { addMeeting } from '../../../actions/meetingAction';
import { formatDate, getEndTimeFormat } from '../../../utils/commons';
import FormFields from '../../FormFields/FormFields';


const disabledDates = [
	//new Date(2020, 4, 4),
]

const today = new Date();
const dd = today.getDate();

const mm = today.getMonth();
const yyyy = today.getFullYear();

const currentDat = new Date(yyyy, mm, dd).getTime();

const NewMeeting  = (props) => {

	const [meetingDate, setMeetingDate] = useState('');
	const [meetingTime, setMeetingTime] = useState('');
	const [formSubmitted, setFormSubmitted] = useState(false);
	const [formError, setFormError] = useState(false);
	const [selectedTime, setSelectedTime] = useState([]);

	

	const onChange = (date) => {
		setMeetingDate(date.toISOString());
		props.dispatch(change('addMeeting', 'meetingDate', date.toISOString()));
		let selectedTime = []
		if (props.meetingList[date]) {
			selectedTime = props.meetingList[date]
				.map((obj) => (
					{ duration: obj.duration, startTime: obj.meetingTime, endTime: getEndTimeFormat(obj.meetingTime, obj.duration) })
				)
			selectedTime.map(item => {
				if (meetingTime >= item.startTime && meetingTime <= item.endTime) {
					setMeetingTime('')
					props.dispatch(change('addMeeting', 'meetingTime', ''));
				}
			})
			setSelectedTime(selectedTime);
			setFormError(false);
		} else {
			setSelectedTime([]);
			setFormError(false);
		}
	}

	const onTimeSelect = (time) => {
		setMeetingTime(time)
		setFormError(false);
		props.dispatch(change('addMeeting', 'meetingTime', time));
	}

	const addMeetingHandler = (val) => {
		console.log("addMeetingHandler : ", val.meetingTime, val.meetingDate, (val.meetingDate !== undefined && val.meetingDate.trim().length === 0));
		if((val.meetingTime === undefined || val.meetingTime.trim().length === 0) || (val.meetingDate === undefined || val.meetingDate.trim().length === 0)) {
			setFormError(true);
			return
		}
		val["event_name"] = props.selectedEvent.event_name;
		val["duration"] = props.selectedEvent.duration;
		console.log("MEETING SUBMIT : ", val, props.selectedEvent._id, props.user._id);
		props.dispatch(addMeeting(val, props.selectedEvent._id, props.user._id))
		setFormSubmitted(true);
	}

	const showConfirmation = () => (
		<Modal.Header closeButton>
			<Modal.Title>
				Confirmed<br />
				{props.selectedEvent.event_name} scheduled with {props.user.full_name}<br />
				{formatDate(meetingDate, meetingTime, props.selectedEvent.duration)}<br />
				<Button onClick={() => setFormSubmitted(false) }>
					Schedule Another meeting
				</Button>
			</Modal.Title>
		</Modal.Header>
	)

	const showForm = () => (
		<div>
			<Modal.Header closeButton>
				<Modal.Title style={{margin: '10px'}}>					
					<Row>
					{props.user.full_name}
					</Row>
					<Row style={{fontSize: '20px'}}>
					{props.selectedEvent.event_name}
					</Row>
					<Row style={{fontSize: '18px', padding: '5px'}}>
					{
						formError && (<Form.Text className="text-white bg-danger">Please select date & time</Form.Text>)
					}
					{
						!formError && meetingDate.length > 0 && meetingTime.length > 0 &&
						formatDate(meetingDate, meetingTime, props.selectedEvent.duration)
					}
					</Row>
				</Modal.Title>
				
			</Modal.Header>

			<Modal.Body>
				<Form onSubmit={props.handleSubmit(addMeetingHandler)}>
					<Row>
						<Col className="col-sm-5">
							<Row>
								<Col>
									<Form>
										<Row>
											<Col>
												<Field component={FormFields} label="First name" type="text" placeholder="First Name" name="first_name" />
											</Col>
											<Col>
												<Field component={FormFields} label="Last name" type="text" placeholder="Last Name" name="last_name" />
											</Col>
										</Row>
										<Row>
											<Col>
												<Field component={FormFields} label="Email address" type="email" placeholder="Enter email" name="email" />
												<Field className="form-control" component="input" type="hidden" name="meetingDate" />
												<Field className="form-control" component="input" type="hidden" name="meetingTime" />
											</Col>
										</Row>
									</Form>
								</Col>
							</Row>
							<Row>
								<Col>
									<Calendar
										onChange={onChange}
										tileDisabled={({ date, view }) => {
											return (view === 'month' &&
												(disabledDates.some(disabledDate => {
													console.log("TileDate : ", date.getDay(), "\n", date.getTime())
													//console.log(date.getDay() , " === " ,disabledDate.getDay())
													return (
														date.getFullYear() === disabledDate.getFullYear() &&
														date.getMonth() === disabledDate.getMonth() &&
														date.getDate() === disabledDate.getDate()
													)
												}
												) ||
													(date.getDay() === 0 || date.getDay() === 6)
													||
													(currentDat > date.getTime())

													//Add some other dates here
												)
											)
										}}
									/>
								</Col>
							</Row>

						</Col>

						<Col className="col-sm-7">
							<Row>
								{
									TIMING.map((time) => {
										// return (
										//     <Col className="col-sm-3" style={{ marginBottom: '5px' }}><Button variant="outline-primary" onClick={() => onTimeSelect(time)}>{time}</Button></Col>
										// )
										if (selectedTime.length === 0) {
											return (
												<Col className="col-sm-3" style={{ marginBottom: '5px' }}><Button variant="outline-primary" onClick={() => onTimeSelect(time)}>{time}</Button></Col>
											)
										}
										let timePresent = false
										selectedTime.map(item => {
											if (time >= item.startTime && time <= item.endTime) {
												timePresent = true;
											}
										})
										if (timePresent) {
											return (
												<Col className="col-sm-3" style={{ marginBottom: '5px' }}><Button disabled href="#" variant="secondary">{time}</Button></Col>
											)
										} else {
											return (
												<Col className="col-sm-3" style={{ marginBottom: '5px' }}><Button variant="outline-primary" onClick={() => onTimeSelect(time)}>{time}</Button></Col>
											)
										}
									})
								}
								<Button variant="primary" type="submit">Schedule Event</Button>
							</Row>
						</Col>
					</Row>

				</Form>
			</Modal.Body>

			<Modal.Footer>
				{/* <Button variant="secondary">Close</Button>
            <Button variant="primary">Schedule Event</Button> */}
			</Modal.Footer>
		</div>
	)

	
		return (
			<Modal show={props.show} onHide={() => {
				props.handleAddMeeting('close');
				setMeetingDate('');
				setMeetingTime('');
				setFormSubmitted(false);
				setSelectedTime([])
			}} scrollable={true} size="xl">
				{formSubmitted && showConfirmation()}
				{(!formSubmitted) && showForm()}
			</Modal>
		)
};


function validate(values) {
	const errors = {};
	if (!values.first_name) {
		errors.first_name = `First name is required`;
	}
	if (!values.last_name) {
		errors.last_name = `Last name is required`;
	}
	if (!values.email) {
		errors.email = `Email is required`;
	}

	return errors;
}

export default (reduxForm({
	validate,
	form: 'addMeeting',
	destroyOnUnmount: true
})(NewMeeting));