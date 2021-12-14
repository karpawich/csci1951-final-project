import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  Typography,
  IconButton,
  Grid,
  Box
} from '@mui/material';
import { VideoMoment, AudioMoment, ImageMoment } from '..';
import CloseIcon from '@mui/icons-material/Close';
import { getScrapbook, getLinksByAnchor, getMomentsByIds, getGroupsByIds } from '../../actions'
import { GroupDisplay } from './GroupDisplay'
import { MomentDisplay } from './MomentDisplay'

import './Scrapbook.css'

export const Scrapbook = () => {
  const { id } = useParams()

  const [scrapbook, setScrapbook] = useState(null)
  const [anchorHistory, setAnchorHistory] = useState([])
  const [anchor, setAnchor] = useState(null)
  const [adjacentNodes, setAdjacentNodes] = useState([])
  const [display, setDisplay] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  // fetch the scrapbook
  useEffect(() => {
    (async () => {
      const sb = await getScrapbook(id)
      setScrapbook(sb)
      setAnchorHistory([ sb.start ])
      setAnchor(sb.start)
    })()
  }, [id])

  // handle left and right arrow key-presses
  useEffect(() => {
    function handleKeyUp(event) {
      switch (event.key) {
        case 'ArrowRight':
          setDialogOpen(true)
          break
        case 'ArrowLeft':
          if (anchorHistory.length > 0) {
            const anchor = anchorHistory[anchorHistory.length - 1]
            setAnchorHistory([...anchorHistory.slice(0, -1)])
            setAnchor(anchor)
          }
          break
        default:
          break
      }
    }

    window.addEventListener('keyup', handleKeyUp)
    return () => window.removeEventListener('keyup', handleKeyUp)
  }, [anchorHistory])

  // update the page content every time the anchor is updated
  useEffect(() => {
    if (!anchor) return

    switch (anchor.anchorType) {
      case 'moment':
        setDisplay(<MomentDisplay anchor={anchor}/>)
        break
      case 'group':
        setDisplay(<GroupDisplay anchor={anchor}/>)
        break
      default:
        break
    }

    (async () => {
      const links = await getLinksByAnchor(anchor)

      function getNodesByType(type) {
        return links.reduce((prev, curr) => {
          let a
          if (
            curr.anchor1.anchorType === anchor.anchorType
            && curr.anchor1.anchorId === anchor.anchorId
          ) {
            a = curr.anchor2
          } else {
            a = curr.anchor1
          }
          if (a.anchorType === type) {
            return [...prev, a.anchorId]
          }
          return [...prev]
        }, [])
      }

      const momentIds = getNodesByType('moment')
      const groupIds = getNodesByType('group')

      const moments = await getMomentsByIds(momentIds)
      const groups = await getGroupsByIds(groupIds)

      setAdjacentNodes([
        ...moments.map((moment) => ({ type: 'moment', node: moment })),
        ...groups.map((group) => ({ type: 'group', node: group }))
      ])
    })()
  }, [anchor])

  function handleClose() {
    setDialogOpen(false)
  }

  return (scrapbook && (
    <div>
      <h1>{scrapbook.name}</h1>
      {anchor && display}
      <LinkDialog
        open={dialogOpen}
        handleClose={handleClose}
        adjacentNodes={adjacentNodes}
        setAnchor={setAnchor}
        setDialogOpen={setDialogOpen}
        anchorHistory={anchorHistory}
        setAnchorHistory={setAnchorHistory}
      />
    </div>
  ))
}

const LinkDialog = (props) => {
  const { open, handleClose, adjacentNodes, setAnchor, setDialogOpen, anchorHistory, setAnchorHistory } = props

  const displayMedia = (media) => {
      switch (media.mediaType) {
          case 'video':
              return <VideoMoment url={media.mediaUrl}/>
          case 'audio':
              return <AudioMoment url={media.mediaUrl}/>
          case 'image':
              return <ImageMoment url={media.mediaUrl}/>
          default:
              return <p></p>
      }
  }

  return (
    <Dialog open={open} fullWidth={true} maxWidth={'xs'} onClose={handleClose}>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Jump to...
        <IconButton
          aria-label='close'
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon/>
        </IconButton>
        </DialogTitle>
      <DialogContent dividers sx={{ height: '400px' }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap'
        }}>
          {adjacentNodes.map(({ type, node }) => {

            function onClick() {
              const anchor = {
                anchorType: type,
                anchorId: node._id
              }

              setDialogOpen(false)
              setAnchorHistory([...anchorHistory, anchor])
              setAnchor(anchor)
            }

            let preview
            switch (type) {
              case 'moment':
                preview = displayMedia(node.media)
                break;
              case 'group':
                preview = <h1>{node.momentIds.length}</h1>
                break
              default:
                break
            }
            return (
              <Box
                onClick={onClick}
                sx={{
                  width: '110px',
                  height: '110px',
                  margin: '10px',
                  backgroundColor: '#eee',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  overflow: 'hidden',
                }}
              >
                {preview}
              </Box>
            )
          })}
        </Box>
      </DialogContent>
    </Dialog>
  )
}