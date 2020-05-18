import React from 'react';
import { Card, ListGroup, Col, Row } from 'react-bootstrap';
import { getDateFormat, getEndTimeFormat } from '../../../utils/commons';

const scheduleDetails = (props) => {
    const { first_name, last_name, duartion, meetingDate, meetingTime, event_name } = props.meeting[0];
    return (

        <div>
            <ListGroup variant="flush">
            <ListGroup.Item variant="dark">{getDateFormat(meetingDate)}</ListGroup.Item>
                {
                    props.meeting && 
                    props.meeting.map((item) => {
                        return (
                                
                                <ListGroup.Item>
                                    <Row>
                                        <Col className="col-sm-1">1</Col>
                        <Col className="col-sm-2">{item.meetingTime} - {getEndTimeFormat(item.meetingTime, item.duration)}</Col>
                                        <Col>{item.first_name} {item.last_name}<br />{item.event_name}</Col>
                                    </Row>
                                </ListGroup.Item>
                            
                        )
                    })
                }
            </ListGroup>
        </div>
    )
    // </Card>
}

export default scheduleDetails;