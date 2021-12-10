import React, {useEffect, useState} from 'react'
import './MainContent.css';



import { VideoMoment, UploadFile, AudioMoment, ImageMoment } from '..';
import { deleteEvent, getMomentsByEvent } from '../../actions';

import { Button } from '@mui/material';

export const MainContent = (props) => {
    const { selectedEvent, momentUploaded, setEventCreated, setSelectedEvent } = props

    const [moments, setMoments] = useState([])

    const fetchMoments = async () => {
        setMoments(await getMomentsByEvent(selectedEvent))
    }

    useEffect(() => {
        fetchMoments()
    }, [selectedEvent, momentUploaded])


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

    const handleDelete = async () => {
        await deleteEvent(selectedEvent._id)
        setEventCreated(prev => !prev)
        setSelectedEvent(null)
    }
    

    return (
        <div className="main-container">
            <div className="main-title">
                {selectedEvent?.name ?? 'No event selected'}
                <button className="delete-button" onClick={() => handleDelete()} color={'warning'}>
                {/* <DeleteForeverIcon color="grey"/> */}
                    Delete Event
                </button>
                
                
            </div>
            <div className="main-subtitle" hidden={selectedEvent?.location}>
                {selectedEvent?.location ?? ''}
            </div>


            <div className="moments-list">
                {moments.map(moment => displayMedia(moment.media))}
            </div>
            
        </div>
    );
}