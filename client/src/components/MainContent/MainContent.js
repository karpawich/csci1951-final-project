import React, {useEffect, useState} from 'react'
import './MainContent.css';

import { VideoMoment, AudioMoment, ImageMoment, OptionsMenu } from '..';
import { deleteEvent, getMomentsByEvent, getMomentsBetweenDates } from '../../actions';
import { useNavigate } from 'react-router-dom'

export const MainContent = (props) => {
	const { event, setEventCreated, setDialogContent } = props

	const [moments, setMoments] = useState([])

	const [startDate, setStartDate] = useState(new Date(event.startTimestamp))
	const [endDate, setEndDate] = useState(new Date())
	const [sortType, setSortType] = useState('new->old')
	const [filterSort, setFilterSort] = useState(false)
	const navigate = useNavigate()

	
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
			<OptionsMenu startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} setFilterSort={setFilterSort} setSortType={setSortType} sortType={sortType} />

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
				{moments.map(moment => displayMedia(moment))}
			</div>
				
		</div>
	);
}
