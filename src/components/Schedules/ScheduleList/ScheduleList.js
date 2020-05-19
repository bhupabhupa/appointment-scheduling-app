import React, { useEffect, useState } from 'react';
import ScheduleDetails from '../ScheduleDetails/ScheduleDetails';
import { Card, Button, Pagination } from 'react-bootstrap';
import { connect } from 'react-redux';
import { viewMeetings } from '../../../actions/meetingAction';
import { getUserId, compareKeys } from '../../../utils/commons';
import { PAGE_COUNT } from '../../../actions/constants';


const ScheduleList = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [scheduleType, setScheduleType] = useState('present')

    useEffect(() => {
        props.dispatch(viewMeetings(getUserId(), scheduleType, currentPage));
    }, [currentPage, scheduleType])


    const showSheduleFor = (type) => {
        setScheduleType(type);
        setCurrentPage(1)
    }

    const renderSchedules = () => {
        let meetingKeys = Object.keys(props.meetingList).sort(compareKeys);
        return meetingKeys.map((item) => {
            return (<ScheduleDetails meeting={props.meetingList[item]} />)
        })
    }

    const renderPageItem = () => {
        let pageElem = [];
        if (props.totalRecords > PAGE_COUNT) {
            let no_of_pages = Math.floor(props.totalRecords / PAGE_COUNT) + 1;

            for (let index = 1; index <= no_of_pages; index++) {
                pageElem.push(<Pagination.Item onClick={() => setCurrentPage(index)} active={index === currentPage} >{index}</Pagination.Item>)
            }
        }

        return pageElem;
    }


    return (
        <div>
            <Button variant="outline-primary" onClick={() => showSheduleFor('present')}>Upcoming</Button>{' '}
            <Button variant="outline-primary" onClick={() => showSheduleFor('past')}>Past</Button>{' '}
            <Card style={{ marginTop: '10px' }}>
                {
                    props.meetingList &&
                    (renderSchedules())
                }
                {
                    props.totalRecords === 0 &&
                    <Card.Title className="text-center" style={{marginTop: '10px'}}>No record found.</Card.Title>
                } 

                {
                    props.totalRecords > 0 &&
                    (<Card.Footer>
                    <Pagination>
                        {renderPageItem()}
                    </Pagination>
                </Card.Footer>)
                }
                
            </Card>


        </div>
    )
};


function mapStateToProps(state, props) {
    const { meetingList, totalRecords, page_no } = state.meetingReducer
    return {
        meetingList,
        totalRecords,
        page_no
    }
}

export default connect(mapStateToProps, null)(ScheduleList);