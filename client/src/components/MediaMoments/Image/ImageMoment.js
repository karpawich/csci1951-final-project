import React from 'react'
import './ImageMoment.css';

export const ImageMoment = (props) => {
    return <div className="wrapper"><img src={props.url}></img></div>
}