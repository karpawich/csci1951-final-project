import React from 'react'
import './ImageMoment.css';

export const ImageMoment = (props) => {
    const { url, momentId, setDialogContent } = props
    return <div className="wrapper"><img src={url}></img></div>
}