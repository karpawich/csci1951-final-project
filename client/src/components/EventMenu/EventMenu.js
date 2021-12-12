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
import { createEvent, getEventsByEmail,  getEmail} from '../../actions'
import { Center } from '@chakra-ui/react'




export const EventMenu = (props) => {
    const { selectedEvent, setSelectedEvent, setDialogContent, eventCreated, userAdded, setUpdatePeopleList } = props

    // const allEvents = [{ name: 'hiking w the bois', startTimestamp: '2017-10-30*02:47:33:899', endTimestamp: '2017-11-1*02:47:33:899', emails:['ms', 'mk']}, { name: 'CS1951v', startTimestamp: '2021-9-1*02:47:33:899', endTimestamp: '	2017-12-9*02:47:33:899', emails:['ms', 'mk', 'mf']}] // temporary
    const [events, setEvents] = useState([])

  const fetchEvents = async () => {
    setEvents(await getEventsByEmail(getEmail()))
    setUpdatePeopleList(prev => !prev)
  }

  useEffect(() => {
    fetchEvents()
    setUpdatePeopleList(prev => !prev)
    }, [eventCreated, userAdded])

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
  const [location, setLocation] = useState('')
  const [email, setEmail] = useState('')
  const [emails, setEmails] = useState([getEmail()])

  const showEmail = async (emailAdded) => {
    if (email != '') {
      document.getElementById("popup").style.color = "grey"
    } else {
      document.getElementById("popup").style.color = "white"
    }

  }

  const hideEmail = async (e) => {
    setEmail(e.target.value)
    document.getElementById("popup").style.color = "white"
  }

  const addEmail = async (newEmail) => {
    if (!(emails.includes(newEmail))) {
      const currentEmails = emails.concat(newEmail)
      setEmails(currentEmails)
      showEmail()
    }
  }

  const addEvent = async () => {
    await createEvent(name, emails)
    props.setEventCreated(prev => !prev)
    props.setContent(null)
  }

  const styles = {
    'dialogContent': {"width": 300},
    'blank': {"width": 290},
    'subtitle': {"marginTop": 30},
    'button': {"marginTop": 40, "marginLeft": 80, "backgroundColor": '#FFFAF0'},
    'popup': {"color": 'white', "fontSize": 12},
    // 'icon': {"marginLeft": 90},
    'trial': {"margin": '0 auto'}
    
  }

    return (
    <>
      <DialogTitle id="responsive-dialog-title">
        New Event
      </DialogTitle>
      <DialogContent style={styles.dialogContent}>
        <div>
          <div>
            <Input style={styles.blank} type="text" placeholder="Event Name" onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <Input style={styles.blank} type="text" placeholder="Location" onChange={(e) => setLocation(e.target.value)} required />
            {/* <Input type="text" placeholder="Date" onChange={(e) => setName(e.target.value)} required /> */}
          </div>

          <div style={styles.subtitle}>
            Add People
          </div>

          <div>
            <Input style={styles.blank} type="text" placeholder="Email" onChange={(e) => hideEmail(e)} required />
          </div>

          <div className="home-btn">
            <IconButton>
              <AddIcon style={styles.trial} color="grey" onClick={() => addEmail(email)}/>
            </IconButton>
          </div>

          <div id="popup" style={styles.popup}>
            Added {email} 
          </div>

          <div>
            <Button style={styles.button} autoFocus onClick={() => addEvent()}>
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