import React, { Component } from 'react';
import ScheduleDetails from '../ScheduleDetails/ScheduleDetails';
import { Card, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { viewMeetings } from '../../../actions/meetingAction';
import { getUserId, compareKeys } from '../../../utils/commons';


class ScheduleList extends Component {
    componentDidMount() {
        this.props.dispatch(viewMeetings(getUserId(), 'present'));
    }

    showSheduleFor(type) {
        this.props.dispatch(viewMeetings(getUserId(), type));
    }

    renderSchedules() {
        let meetingKeys = Object.keys(this.props.meetingList).sort(compareKeys);
        return meetingKeys.map((item) => {
            return (<ScheduleDetails meeting={this.props.meetingList[item]} />)
        })
    }

    render() {
        return (
            <div>
        <Button variant="outline-primary" onClick={() => this.showSheduleFor('present')}>Upcoming</Button>{' '}
        <Button variant="outline-primary" onClick={() => this.showSheduleFor('past')}>Past</Button>{' '}
        <Card style={{marginTop: '10px'}}>
            {
                this.props.meetingList && 
                (this.renderSchedules())
            }
        </Card>
        
    </div>
        )
    }
};


function mapStateToProps(state, props) {
    return {
        meetingList: state.meetingReducer.meetingList
    }
}

export default connect(mapStateToProps, null)(ScheduleList);