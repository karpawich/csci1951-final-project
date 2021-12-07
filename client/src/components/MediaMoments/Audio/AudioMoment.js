import React from 'react'
import './AudioMoment.css';

export const AudioMoment = (props) => {
    return (
        <div className="wrapper">
            <audio controls>
                <source src={props.url}></source>
            </audio>
        </div>)
}