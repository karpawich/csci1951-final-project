
import { AddEventDialog, AddUserDialog, UploadFile } from '..';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, useMediaQuery, useTheme } from '@mui/material';

export const AdaptiveDialog = (props) => {
  const { content, setContent } = props

  const decideContent = () => {
    switch (content) {
      case 'addEvent':
        return <AddEventDialog setContent={setContent}/>
      case 'addUser':
        return <AddUserDialog setContent={setContent}/>
      case 'addMoments':
        return <UploadFile setContent={setContent} />
    
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