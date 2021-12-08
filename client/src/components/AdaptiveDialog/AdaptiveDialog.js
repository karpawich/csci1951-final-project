
import { UploadFile } from '..';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, useMediaQuery, useTheme } from '@mui/material';

export const AdaptiveDialog = (props) => {
  const { content, setContent } = props

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
        <Button autoFocus onClick={() => setContent(null)}>
          Close
        </Button>
      </DialogActions>
      </>
  )

  const decideContent = () => {
    switch (content) {
      case 'miku':
        return mikuContent()
      
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