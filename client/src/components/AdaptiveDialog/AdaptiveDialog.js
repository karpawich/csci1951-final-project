
import { AddEventDialog, AddUserDialog, UploadFile } from '..';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, useMediaQuery, useTheme } from '@mui/material';

export const AdaptiveDialog = (props) => {
  const { content, setDialogContent, event, setEventCreated, setUserAdded } = props

  const decideContent = () => {
    switch (content) {
      case 'addEvent':
        return <AddEventDialog setDialogContent={setDialogContent} setEventCreated={setEventCreated}/>
      case 'addUser':
        if (event?._id) {
          return <AddUserDialog setContent={setDialogContent} eventId={event._id} setUserAdded={setUserAdded}/>
        } else {
          alert('Please select an event first')
          setDialogContent(null)
        }
        break;
      
      case 'addMoments':
        return <UploadFile setContent={setDialogContent} />
      default:
        return <></>
    }
  }


  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={content !== null}
        onClose={() => setDialogContent(null)}
        aria-labelledby="responsive-dialog-title"
      >
        {decideContent()}
      </Dialog>
    </div>)
}