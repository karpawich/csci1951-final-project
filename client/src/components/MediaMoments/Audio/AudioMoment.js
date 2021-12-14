import React from 'react'
import './AudioMoment.css';

export const AudioMoment = (props) => {
    const { url, momentId, setDialogContent } = props
    return (
        <div className="wrapper">
            <audio controls>
                <source src={url}></source>
            </audio>
        </div>)
}