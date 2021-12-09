import React, {useEffect, useState} from 'react'
import { Fab, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery, useTheme } from '@mui/material'

import './EventMenu.css'

// material components
import {List, ListItemText, ListItemButton, IconButton, Input, Button} from '@mui/material'
import { margin } from '@mui/system'
import AddIcon from '@mui/icons-material/Add'
import MenuBookIcon from '@mui/icons-material/MenuBook'

// eventGateway
import { createEvent, getEventsByEmail } from '../../actions'




export const EventMenu = (props) => {
    const { selectedEvent, setSelectedEvent, userEmail, setDialogContent } = props

    const [events, setEvents] = useState([])

    const fetchEvents = async () => setEvents(await getEventsByEmail(userEmail))

    useEffect(() => {
        //fetchEvents()
    }, [])

    const eventsMap = () => {
        return events.map(event => 
            <ListItemButton key={event.startTimestamp} disabled={selectedEvent?.startTimestamp === event.startTimestamp} selected={selectedEvent?.startTimestamp === event.startTimestamp}
                onClick={() => setSelectedEvent(event)}>
                <ListItemText style={{"margin":0}} primary={event.name} />
            </ListItemButton>)
    }

    return (
        <div className="event-container">
            {/* <div className="home-btn">
                <IconButton >
                    <MenuBookIcon style={{"fontSize": 40}} color="green"/>
                </IconButton>
            </div> */}


            <div className="event-list">
                <List style={{"marginTop":10, "marginLeft":5, "fontSize":30, "fontWeight":'bold'}} subheader="Events">
                    {eventsMap()}
                </List>
            </div>
            <IconButton onClick={() => setDialogContent('addEvent')}>
                <AddIcon color="grey"/>
            </IconButton>

        </div>)
}


export const AddEventDialog = (props) => {
    const [name, setName] = useState('')
    const [emails, setEmails] = useState(['test'])

    const addEvent = async () => (await createEvent(name, emails)).data

    return (
    <>
      <DialogTitle id="responsive-dialog-title">
        New Event
      </DialogTitle>
      <DialogContent>
            <div>
              <Input type="text" placeholder="Event Name" onChange={(e) => setName(e.target.value)} required />
              TODO: implement a search of possible people to add to event

            <Button onClick={() => addEvent()}>Create Event</Button>       
        </div>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => props.setContent(null)}>
          Close
        </Button>
      </DialogActions>
    </>
  )
}