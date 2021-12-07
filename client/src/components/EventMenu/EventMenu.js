import React, {useEffect} from 'react'

// material components
import {List, ListItemText, ListItemButton} from '@mui/material'


export const EventMenu = (props) => {
    const { selectedPeople, selectedEvent, setSelectedEvent } = props

    const eventsMap = () => {
        // need a func here to get the join events from more than one person
        // I can do this in front end if needed, but seems more scalable
        const events = [{
            name: 'hiking w the bois', startTimestamp: Date.now(), emails: ['ms', 'mk', 'ms']
        }]
        
        return events.map(event => 
            <ListItemButton key={event.startTimestamp} disabled={selectedEvent?.startTimestamp === event.startTimestamp} selected={selectedEvent?.startTimestamp === event.startTimestamp}
                onClick={() => setSelectedEvent(event)}>
                <ListItemText primary={event.name} />
            </ListItemButton>)
    }

    return (
        <div className="container">

            <div className="event-list">
                <List subheader="Events">
                    {eventsMap()}
                </List>
            </div>

        </div> )
}