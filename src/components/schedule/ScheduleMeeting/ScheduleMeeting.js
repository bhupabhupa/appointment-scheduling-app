import React, { Component } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import EventDetails from '../../Events/EventDetails/EventDetails';
import NewMeeting from '../NewMeeting/NewMeeting';
import { connect } from 'react-redux';
import * as eventAction from '../../../actions/eventAction';
import { getUser } from '../../../actions/userAction';
import { viewMeetings } from '../../../actions/meetingAction';


class ScheduleMeeting extends Component {
	state = {
		showAddMeeting: false,
		selectedEvent: {}
	}

	componentDidMount() {
		this.props.dispatch(eventAction.viewEvents(this.props.match.params.user_id));
		//this.props.match.params.user_id
		this.props.dispatch(getUser(this.props.match.params.user_id));
		this.props.dispatch(viewMeetings(this.props.match.params.user_id, 'present'))
	}

	handleAddMeeting = (event, selectedEvent) => {
		if (event === 'open') {
			this.setState({ selectedEvent: selectedEvent, showAddMeeting: true })
		} else if (event === 'close') {
			this.setState({ showAddMeeting: false })
		}
	}

	renderWrongLink = () => (
		<Card className="text-center">
				<Card.Title>Please check ur Link</Card.Title>
				</Card>
	)

	renderForm = () => (
		<Card className="text-center">
			<Card.Body>
				<Card.Title>{this.props.user.full_name}</Card.Title>
				<Card.Text>
					Welcome to my scheduling page. Please follow the instruction to add schedule to my calender.
							</Card.Text>
				<Container>
					<Row>
						{
							this.props.eventList &&
							this.props.eventList.map((event) => (
								<Col style={{ marginBottom: '10px' }}><EventDetails event={event} showMeeting={this.handleAddMeeting} /></Col>
							))
						}
					</Row>
				</Container>
			</Card.Body>
			<NewMeeting meetingList={this.props.meetingList} show={this.state.showAddMeeting} selectedEvent={this.state.selectedEvent} user={this.props.user} handleAddMeeting={this.handleAddMeeting} />
		</Card>
	)

	render() {
		if (this.props.user) {
			return (
				this.renderForm()
			)
		} else {
			return (this.renderWrongLink())
		}

	}

};


function mapStateToProps(state, props) {
	return {
		eventList: state.eventReducer.eventList,
		meetingList: state.meetingReducer.meetingList,
		user: state.userReducer.user
	}
}

export default connect(mapStateToProps, null)(ScheduleMeeting);