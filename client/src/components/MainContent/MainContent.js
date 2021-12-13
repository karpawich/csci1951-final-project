import React, {useEffect, useState} from 'react'
import './MainContent.css';

import { VideoMoment, AudioMoment, ImageMoment } from '..';
import { deleteEvent, getMomentsByEvent } from '../../actions';

export const MainContent = (props) => {
	const { event, setEventCreated } = props

	const [moments, setMoments] = useState([])

	useEffect(() => {
		(async () => {
			setMoments(await getMomentsByEvent(event))
		})()
	}, [event])


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
			await deleteEvent(event._id)
			setEventCreated(prev => !prev)
	}


    return (
			<div className="main-container">
				<div className="main-title">
					{event?.name ?? 'No event selected'}
					<button className="delete-button" onClick={() => handleDelete()} color={'warning'}>
					{/* <DeleteForeverIcon color="grey"/> */}
							Delete Event
					</button>	
				</div>

				<div className="main-subtitle" hidden={event?.location}>
						{event?.location ?? ''}
				</div>

				<div className="moments-list">
						{moments.map(moment => displayMedia(moment.media))}
				</div>

			{/* <div>
				<IconButton>
					<SupervisedUserCircleIcon color="grey" />
				</IconButton>
			</div> */}
			
			<div className="main-subtitle" hidden={event?.location}>
					{event?.location ?? ''}
			</div>


			<div className="moments-list">
					{moments.map(moment => displayMedia(moment.media))}
			</div>
				
		</div>
	);
}


