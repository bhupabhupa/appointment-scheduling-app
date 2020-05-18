import React from 'react';
import { Card, Button } from 'react-bootstrap';

const eventDetails = (props) => (
    <Card style={{ width: '18rem' }}>
  <Card.Body>
<Card.Title>{props.event.event_name}</Card.Title>
{ props.isUser && <Card.Text>{props.event.duration} min</Card.Text> }
    </Card.Body>
    <Card.Footer className="text-muted">
    { props.isUser && <Button onClick={() => props.showEvent('open', 'Edit', props.event)}>Edit</Button> }
    { !props.isUser && <Button onClick={() => props.showMeeting('open', props.event)}>Select</Button> }
    </Card.Footer>
    
</Card>
)

export default eventDetails;