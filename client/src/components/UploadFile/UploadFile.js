import React, { useRef, useState } from 'react'
import { uploadFile } from '../../actions/firebaseStorage'

import { Fab, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, useMediaQuery, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import './UploadFile.css';

export const UploadDialog = (props) => {
  const { open , setOpen, contentType } = props

  const ogContent = () => (
    <>
    <DialogTitle id="responsive-dialog-title">
          {"Use Google's location service?"}
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => setOpen(false)}>
          Close
        </Button>
      </DialogActions>
      </>
  )

  const mikuContent = () => (
    <>
    <DialogTitle id="responsive-dialog-title">
          {"Miku"}
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => setOpen(false)}>
          Close
        </Button>
      </DialogActions>
      </>
  )

  const decideContent = () => {
    switch (contentType) {
      case 'miku':
        return mikuContent()
        break;
    
      default:
        return ogContent()
        break;
    }
  }
  
  const AddButton = () =>
    (<div className="fab-wrapper">
      <Fab className="fab" variant="extended" color="primary" aria-label="add" onClick={() => setOpen(true)}>
        <AddIcon sx={{ mr: 1 }} />
        Add Moments
      </Fab>
    </div>)

    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <div>
      {AddButton()}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="responsive-dialog-title"
      >
        {decideContent()}
      </Dialog>
    </div>)
}

export const UploadFile = () => {
    const fileInputRef = useRef()
    const [progress, setProgress] = useState(0)
    
    const uploadFiles = async () => {
        const urls = []

        const files = fileInputRef.current.files
        for (let i = 0; i < files.length; i++) {
            const file = files.item(i);
            try {
                const url = await uploadFile(file, setProgress, 'test');
                urls.push(url);
            } catch (error) {
                console.error(`Failure to upload file ${file.name}`);
            }
        }
        
        // reset file input
        fileInputRef.current.value = null;
        goToDB(urls);
    }

    const goToDB = async (urls) => {
        console.log(urls);
        // TODO @max
    }

    return (
        <div>
            <input type="file" onChange={() => uploadFiles()} ref={fileInputRef} multiple></input>
            <p>{progress}</p>
        </div>
    );
}