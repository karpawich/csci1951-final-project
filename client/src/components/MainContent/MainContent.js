import React, {useEffect, useState} from 'react'
import './MainContent.css';

import {IconButton} from '@mui/material'
import { VideoMoment, AudioMoment, ImageMoment, OptionsMenu, MomentView } from '..';
import { deleteEvent, getMomentsByEvent, getMomentsBetweenDates } from '../../actions';
import { useNavigate } from 'react-router-dom'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export const MainContent = (props) => {
	const { event, setEventCreated, setDialogContent, startDate, endDate, sortType, filterSort } = props

	const [moments, setMoments] = useState([])

    const navigate = useNavigate()

	const styles = {
		'momentButton': {"marginTop": 0, "padding": 3, "borderRadius": 10, "backgroundColor": '#FFE4E1', "position": "absolute", "right": 80},
	}
	
	useEffect(() => {
		(async () => {
			const filtered = await getMomentsBetweenDates(event, startDate, endDate)
			console.log(filtered)
			setMoments([...filtered.sort((m1, m2) => sortType === 'old->new' ? Date.parse(m1.timestamp) -  Date.parse(m2.timestamp) : Date.parse(m2.timestamp) -  Date.parse(m1.timestamp))])
		})()
	}, [filterSort])

	useEffect(() => {
		(async () => {
			setMoments(await getMomentsByEvent(event))
		})()
	}, [event])



	const wrapMoment = (moment) => {
		return (
			<>
				{displayMedia(moment)}
				<div>
					{/* <IconButton style={styles.momentButton}> */}
					<IconButton style={styles.momentButton} onClick={() => setDialogContent(<MomentView setContent={setDialogContent} moment={moment}/>)}>
						<MoreHorizIcon color="grey"/>
					</IconButton>
				</div>
			</>
		)
	}


	const displayMedia = (moment) => {
		const { media, _id } = moment
		switch (media.mediaType) {
			case 'video':
				return <VideoMoment url={media.mediaUrl} momentId={_id} setDialogContent={setDialogContent}/> 
			case 'audio':
				return <AudioMoment url={media.mediaUrl} momentId={_id} setDialogContent={setDialogContent}/>
			case 'image':
				return <ImageMoment url={media.mediaUrl} momentId={_id} setDialogContent={setDialogContent}/>
			default:
				return <p>downloadMoment @ {media.mediaUrl}</p>
		}
		
	}

	const handleDelete = async () => {
		await deleteEvent(event._id)
		navigate(`/event/`)
		//setEventCreated(prev => !prev)
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
				{moments.map(moment => wrapMoment(moment))}
			</div>

		</div>
	);
}
