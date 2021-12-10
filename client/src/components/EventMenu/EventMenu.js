import React, {useEffect, useState} from 'react'
import { Fab, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery, useTheme } from '@mui/material'

import './EventMenu.css'

// material components
import {List, ListItemText, ListItemButton, IconButton, Input, Button} from '@mui/material'
import { margin } from '@mui/system'
import AddIcon from '@mui/icons-material/Add'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import LogoutIcon from '@mui/icons-material/Logout';

// eventGateway
import { createEvent, getEventsByEmail, getEmail } from '../../actions'
import { Center } from '@chakra-ui/react'




export const EventMenu = (props) => {
    const { selectedEvent, setSelectedEvent, setDialogContent } = props

    const allEvents = [{ name: 'hiking w the bois', startTimestamp: '2017-10-30*02:47:33:899', endTimestamp: '2017-11-1*02:47:33:899', emails:['ms', 'mk']}, { name: 'CS1951v', startTimestamp: '2021-9-1*02:47:33:899', endTimestamp: '	2017-12-9*02:47:33:899', emails:['ms', 'mk', 'mf']}] // temporary
    const [events, setEvents] = useState(allEvents)

    const fetchEvents = async () => setEvents(await getEventsByEmail(getEmail()))

    useEffect(() => {
        fetchEvents()
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

            <div class="dropdown" style={{"position": 'absolute', "bottom": 5, "left": 0 }}>
                <IconButton >
                    <LogoutIcon style={{"margin": 10}} color="grey"/>
                </IconButton>
              <div class="dropdown-content">
                <a href="#">Log Out</a>
              </div>
            </div>
        </div>
        )
}


export const AddEventDialog = (props) => {
    const [name, setName] = useState('')
    const [emails, setEmails] = useState([getEmail()])

    const addEvent = async () => (await createEvent(name, emails))

    const styles = {
        'button': {"marginTop": 20, "marginLeft": 20, "backgroundColor": '#FFFAF0'},
        'subtitle': {"marginTop": 20},
        'icon': {"marginLeft": 60},
        'trial': {"margin": '0 auto'}
    }

    return (
    <>
      <DialogTitle id="responsive-dialog-title">
        New Event
      </DialogTitle>
      <DialogContent className="home-btn">
            <div>
              <div>
                <Input type="text" placeholder="Event Name" onChange={(e) => setName(e.target.value)} required />
              </div>
              <div>
                <Input type="text" placeholder="Location" onChange={(e) => setName(e.target.value)} required />
                {/* <Input type="text" placeholder="Date" onChange={(e) => setName(e.target.value)} required /> */}
              </div>

              <div style={styles.subtitle}>
                Add People
              </div>

              {/* <div>
                <Input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} required />
              </div> */}
              <div>
                <Input type="text" placeholder="Email" onChange={(e) => setName(e.target.value)} required />
              </div>

              <div className="home-btn">
                <IconButton>
                  <AddIcon style={styles.trial} color="grey"/>
                </IconButton>
              </div>

              <div>
                <Button style={styles.button} autoFocus onClick={() => addEvent()}>
                    {/* TO-DO: Add action */}
                    Create Event
                </Button>
            </div>
                  
        </div>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => props.setContent(null)}>
          Close
        </Button>
      </DialogActions >
    </>
  )
}