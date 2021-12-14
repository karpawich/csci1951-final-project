import React, {useState, useEffect} from 'react'
import './Events.css';

import AddIcon from '@mui/icons-material/Add'
import { Input, Button, List, ListItemText, ListItemButton, IconButton, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { AddButton } from '..'
import { createEvent, getEventsByEmail, useGetEmail } from '../../actions'
import { useNavigate } from 'react-router-dom'

export const Events = (props) => {
  const { setDialogContent } = props

  const getEmail = useGetEmail()

  const [events, setEvents] = useState([])
  const navigate = useNavigate()

  const fetchEvents = async () => {
      const email = getEmail()
      const events = await getEventsByEmail(email)
      setEvents(events)
  }

  useEffect(() => {
    (async () => await fetchEvents())()
  }, [getEmail])

  
  useEffect(() => {
    const interval = setInterval(() => {
      (async () => await fetchEvents())()
		}, 5000);

		return () => clearInterval(interval); // thanks @Luca D'Amico
	}, [])

  function navigateToEvent(event) {
    navigate(`/event/${event._id}`, { state: event })
  }

  return (
    <div className='Events'>
      <h1>Your events</h1>
      <div className='list-wrapper'>
        <List style={{width: '100%', 'overflow-y': 'auto'}}>
          {events.map(event => (
            <ListItemButton
              style={{ height: '40px'}}
              key={event.startTimestamp}
              onClick={() => navigateToEvent(event)}
            >
              <ListItemText style={{"margin":0}} primary={event.name} />
            </ListItemButton>
          ))}
        </List>
        <IconButton onClick={() => setDialogContent(<AddEventDialog setDialogContent={setDialogContent} />)}>
          <AddIcon color="grey"/>
        </IconButton>
      </div>
    </div>
  )
}

export const AddEventDialog = (props) => {
  const { setDialogContent } = props

  const getEmail = useGetEmail()

  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [email, setEmail] = useState('')
  const [emails, setEmails] = useState([getEmail()])

  const navigate = useNavigate()

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
    const { event } = await createEvent(name, emails)
    navigate(`/event/${event._id}`)
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
        <Button autoFocus onClick={() => setDialogContent(null)}>
          Close
        </Button>
      </DialogActions>
    </>
  )
}