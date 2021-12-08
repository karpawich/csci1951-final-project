import React, {useEffect} from 'react'
import './EventMenu.css'

// material components
import {List, ListItemText, ListItemButton, IconButton} from '@mui/material'
import { margin } from '@mui/system'
import AddIcon from '@mui/icons-material/Add'


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
                <ListItemText style={{"margin":0}} primary={event.name} />
            </ListItemButton>)
    }

    return (
        <div className="event-container">

            <div className="event-list">
                <List style={{"marginTop":20, "marginLeft":5, "fontSize":30, "fontWeight":'bold'}} subheader="Events">
                    {eventsMap()}
                </List>
            </div>
            <IconButton>
                {/* Add action */}
                <AddIcon color="grey"/>
            </IconButton>

        </div> )
}