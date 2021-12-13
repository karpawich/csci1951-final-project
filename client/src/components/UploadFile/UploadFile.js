import React, { useEffect, useRef, useState } from 'react'
import { uploadFile } from '../../actions/firebaseStorage'

import { Fab, DialogActions, DialogContent, DialogTitle, Input, Button, IconButton, Select, MenuItem } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useLocation } from 'react-router-dom'

import { useGetEmail, uploadMoment, getEventsByEmail } from '../../actions'

import './UploadFile.css';

export const AddButton = (props) =>
  (<div className="fab-wrapper">
  <Fab className="fab" variant="extended" color="primary" aria-label="add" onClick={() => props.setDialogContent(<UploadFile setContent={props.setDialogContent}/>)}>
        <AddIcon sx={{ mr: 1 }} />
        Add Moments
      </Fab>
  </div>)
    


export const UploadFile = (props) => {
  const { setContent } = props

  const getEmail = useGetEmail()
  const location = useLocation()

  const fileInputRef = useRef()
  const [progress, setProgress] = useState(0)

  const getMediaType = (fileType) => fileType.substr(0, fileType.indexOf('/'))

  const email = getEmail()
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState('')

  useEffect(() => {
    (async () => {
      const events = await getEventsByEmail(email)
      setEvents(events)
      const matches = location.pathname.match(/event\/(.*)/)
      if (Array.isArray(matches)) {
        const id = matches[1]
        setSelectedEvent(events.find((e) => e._id === id))
      }
    })()
  }, [email, location.pathname])

  const handleSubmit = async (event) => {
    const files = fileInputRef.current.files

    // reject if the form isn't ready
    if (files.length === 0 || !selectedEvent) return

    // upload each file to Firebase and each moment to our database
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      try {
        const userEmail = getEmail()
        const url = await uploadFile(file, setProgress, userEmail)
        await uploadMoment(url, getMediaType(file.type), [...emails, userEmail], new Date(), selectedEvent._id)
      } catch (error) {
        console.error(`Failure to upload file ${file.name}`);
        console.error(error)
      }
    }

    // reset the form
    fileInputRef.current.value = null;
    setSelectedEvent(null)
  }

  function onEventSelectChange(e) {
    setSelectedEvent(e.target.value)
  }
  
  const [emails, setEmails] = useState([])
  const [name, setName] = useState([])

  const styles = {
    'button': {"marginTop": 20, "marginLeft": 20, "backgroundColor": '#FFFAF0'},
    'subtitle': {"marginTop": 20},
    'icon': {"marginLeft": 60},
    'trial': {"margin": '0 auto'}
  }

  return (
    
    <>
      <DialogTitle id="responsive-dialog-title">
        New moments
      </DialogTitle>
      <DialogContent>
        <div>
            <input type="file" ref={fileInputRef} multiple></input>
            <p>{progress}</p>
        </div>

        <div style={styles.subtitle}>
          Event
        </div>

        <div>
          <Select style={{width: '100%'}} onChange={onEventSelectChange} value={selectedEvent}>
            {events.map(event => (
              <MenuItem value={event}>{event.name}</MenuItem>
            ))}
          </Select>
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
        <div>
          <IconButton>
            <AddIcon style={styles.trial} color="grey"/>
          </IconButton>
        </div>

      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} autoFocus>
          Submit
        </Button>
        <Button autoFocus onClick={() => setContent(null)}>
          Close
        </Button>
      </DialogActions>
    </>
  )

}