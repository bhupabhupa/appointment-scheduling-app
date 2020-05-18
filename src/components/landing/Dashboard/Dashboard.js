import React, { Component } from 'react';
import Navigation from '../Navigation/Navigation';
import TitleBar from './TitleBar/TitleBar';

import { Card, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import EventList from '../../Events/EventList/EventList';
import ScheduleList from '../../Schedules/ScheduleList/ScheduleList';

class Dashboard extends Component {

    state = {
        key: 'events'
    }

    changeTab = (key) => {
        this.setState({ key })
    }

    showTab = () => {
        if(this.state.key === 'schedules') {
            return (<ScheduleList />)
        } else {
            return (<EventList />)
        }
    }

    render() {
        if(sessionStorage.getItem('loggedIn') === null) {
            return <Redirect to="/" />
        }
        

        
        return (
            <div>
                <Navigation />
                <Card>
                    <Card.Body>
                        <Card.Title>
                            <TitleBar /> 
                        </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                            <Button onClick={() => this.changeTab('events')} style={{marginRight: '10px'}}>Event Types</Button>
                            <Button onClick={() => this.changeTab('schedules')}>Scheduled Events</Button>
                        </Card.Subtitle>

                        
                        <Card.Text>
                            {this.showTab()}
                        </Card.Text>
                        
                    </Card.Body>
                </Card>

            </div>
        )
    }
};


export default Dashboard;