import React, {useState, useEffect} from 'react'
import './VideoMoment.css';

import ReactPlayer from 'react-player'

export const VideoMoment = (props) => {
    const { url, momentId, setDialogContent } = props
    return <div className="player-wrapper"><ReactPlayer className="react-player" url={url} controls width="100%" height="100%"/></div>
}