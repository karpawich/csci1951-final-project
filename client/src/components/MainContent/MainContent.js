import React from 'react'
import './MainContent.css';

import { VideoMoment, AudioMoment, ImageMoment } from '..';
import { getMomentsByEvent } from '../../actions';

export const MainContent = (props) => {
    const {selectedEvent} = props

    const [moments, setMoments] = useState([])

    const fetchMoments = async () => {
        setMoments(await getMomentsByEvent(selectedEvent))
    }

    useEffect(() => {
        //fetchMoments()
    }, [])


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
                hiking w the bois
            </div>

            <div className="moments-list">
                {moments.map(moment => determineMoment(moment.media))}
            </div>
            
        </div>
    );
}