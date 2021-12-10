import React, { useRef, useState } from 'react'
import { uploadFile } from '../../actions/firebaseStorage'

import { Fab, DialogActions, DialogContent, DialogTitle, Input, Button } from '@mui/material'
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
  const {setContent, selectedEvent} = props

  const fileInputRef = useRef()
  const [progress, setProgress] = useState(0)

  const getMediaType = (fileType) => fileType.substr(0, fileType.indexOf('/'))
    
  const uploadFiles = async () => {
      const files = fileInputRef.current.files
      for (let i = 0; i < files.length; i++) {
          const file = files.item(i);
        try {
            // TODO: replace test with user logged in url
          const url = await uploadFile(file, setProgress, getEmail());
          //await uploadMoment(url, getMediaType(file.type), ['test'], new Date(), '')
          } catch (error) {
              console.error(`Failure to upload file ${file.name}`);
          }
      }
      
      // reset file input
      fileInputRef.current.value = null;
  }
  const [name, setName] = useState('')

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
        <div>
          <Input type="text" placeholder="People" onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
        TODO: implement a search of possible people
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