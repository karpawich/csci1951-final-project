import React, { useRef, useState } from 'react'
import { uploadFile } from '../../actions/firebaseStorage'

import { Fab, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, useMediaQuery, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import './UploadFile.css';

export const AddButton = () => {
    return (
        <div className="fab-wrapper">
            <Fab className="fab" variant="extended" color="primary" aria-label="add">
                <AddIcon sx={{ mr: 1 }} />
                Add Moments
            </Fab>
        </div>
    )
}

export const UploadDialog = (props) => {
    const { open, setOpen } = props
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
    
    return (
        <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={setOpen(false)}
        aria-labelledby="responsive-dialog-title"
      >
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
          <Button autoFocus onClick={setOpen(false)}>
            Disagree
          </Button>
          <Button onClick={setOpen(false)} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>)
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