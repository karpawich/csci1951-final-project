
import { AddEventDialog, AddUserDialog, UploadFile, MomentView } from '..';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, useMediaQuery, useTheme } from '@mui/material';

export const AdaptiveDialog = (props) => {
  const { content, setDialogContent } = props

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
        {content === null ? <></> : content}
      </Dialog>
    </div>)
}