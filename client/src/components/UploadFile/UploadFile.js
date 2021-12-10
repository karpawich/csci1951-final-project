import React, { useRef, useState } from 'react'
import { uploadFile } from '../../actions/firebaseStorage'

import { Fab, DialogActions, DialogContent, DialogTitle, Input, Button, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

import { getEmail, uploadMoment } from '../../actions'

import './UploadFile.css';

export const AddButton = (props) =>
  (<div className="fab-wrapper">
      <Fab className="fab" variant="extended" color="primary" aria-label="add" onClick={() => props.setDialogContent('addMoments')}>
        <AddIcon sx={{ mr: 1 }} />
        Add Moments
      </Fab>
  </div>)
    



export const UploadFile = (props) => {
  const {setContent, selectedEvent, setMomentUploaded} = props

  const fileInputRef = useRef()
  const [progress, setProgress] = useState(0)

  const getMediaType = (fileType) => fileType.substr(0, fileType.indexOf('/'))
    
  const uploadFiles = async () => {
      const files = fileInputRef.current.files
      for (let i = 0; i < files.length; i++) {
          const file = files.item(i);
        try {
            // TODO: replace test with user logged in url
          const userEmail = getEmail()
          const url = await uploadFile(file, setProgress, userEmail)
          await uploadMoment(url, getMediaType(file.type), [...emails, userEmail], new Date(), selectedEvent._id)
          } catch (error) {
              console.error(`Failure to upload file ${file.name}`);
              console.error(error)
          }
      }
      
      // reset file input
      fileInputRef.current.value = null;

    setMomentUploaded(prev => !prev)
    setContent(null)
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
        Upload Moments :)
      </DialogTitle>
      <DialogContent>
        <div>
            <input type="file" onChange={() => uploadFiles()} ref={fileInputRef} multiple></input>
            <p>{progress}</p>
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
        <Button autoFocus onClick={() => setContent(null)}>
          Close
        </Button>
      </DialogActions>
    </>
  )

}