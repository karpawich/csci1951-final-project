
import { AddEventDialog, AddUserDialog, UploadFile } from '..';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, useMediaQuery, useTheme } from '@mui/material';

export const AdaptiveDialog = (props) => {
  const { content, setContent, selectedEvent } = props

  const decideContent = () => {
    switch (content) {
      case 'addEvent':
        return <AddEventDialog setContent={setContent}/>
      case 'addUser':
        if (selectedEvent?._id) {
          return <AddUserDialog setContent={setContent} eventId={selectedEvent._id} />
        } else {
          alert('Please select an event first')
          setContent(null)
        }
        break;
      
      case 'addMoments':
         if (selectedEvent?._id) {
           return <UploadFile setContent={setContent} selectedEvent={selectedEvent}/>
        } else {
          alert('Please select an event first')
          setContent(null)
        }
        break;
    
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
        onClose={() => setContent(null)}
        aria-labelledby="responsive-dialog-title"
      >
        {decideContent()}
      </Dialog>
    </div>)
}