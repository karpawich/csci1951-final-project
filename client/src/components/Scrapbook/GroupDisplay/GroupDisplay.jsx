import { useEffect, useState } from 'react'

import { VideoMoment, AudioMoment, ImageMoment } from '../..'

import { getGroupById } from '../../../actions'

import './GroupDisplay.css'

export const GroupDisplay = (props) => {
  const { anchor } = props

  const [group, setGroup] = useState(null)

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

  useEffect(() => {
    (async () => {
      const { anchorId: id } = anchor
      const group = await getGroupById(id)
      setGroup(group)
    })()
  }, [anchor])

  return (
    group && group.momentIds.map((moment) => {
      return displayMedia(moment.media)
    })
  )
}