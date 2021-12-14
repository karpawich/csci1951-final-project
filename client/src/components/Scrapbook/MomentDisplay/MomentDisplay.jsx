import { useEffect, useState } from 'react'

import { VideoMoment, AudioMoment, ImageMoment } from '../..'

import { getMomentById } from '../../../actions'

import './MomentDisplay.css'

export const MomentDisplay = (props) => {
  const { anchor } = props

  const [moment, setMoment] = useState(null)

  useEffect(() => {
    (async () => {
      const { anchorId: id } = anchor
      const moment = await getMomentById(id)
      setMoment(moment)
    })()
  }, [anchor])

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
    moment && displayMedia(moment.media)
  )
}