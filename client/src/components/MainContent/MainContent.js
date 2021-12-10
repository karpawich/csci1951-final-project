import React, {useEffect, useState} from 'react'
import './MainContent.css';



import { VideoMoment, UploadFile, AudioMoment, ImageMoment } from '..';
import { getMomentsByEvent } from '../../actions';

export const MainContent = (props) => {
    const {selectedEvent} = props

    const [moments, setMoments] = useState([])

    const fetchMoments = async () => {
        setMoments(await getMomentsByEvent(selectedEvent))
    }

    useEffect(() => {
        fetchMoments()
    }, [selectedEvent])


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
        <div className="main-container">
            <div className="main-title">
                {selectedEvent?.name ?? 'No event selected'}
                <button className="delete-button">
                {/* <DeleteForeverIcon color="grey"/> */}
                    Delete Event
                </button>
                
                
            </div>
            
            <div className="main-subtitle">
                Florida
            </div>

            <div className="moments-list">
                {moments.map(moment => displayMedia(moment.media))}
            </div>
            
        </div>
    );
}