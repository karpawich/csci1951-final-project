import React, {useEffect, useState} from 'react'
import './PeopleMenu.css';

// material components
import { useNavigate } from 'react-router-dom'

// icons
import CancelIcon from '@mui/icons-material/Cancel'


export const ScrapbookMenu = (props) => {
	// can make this async from db, doesn't need to be a prop
	const { event } = props;

	const [scrapbooks, setScrapbooks] = useState([])

	const navigate = useNavigate()

	useEffect(() => {
		(async () => {
			setScrapbooks(await getScrapbooksByEventId(event._id))
        })()
	}, [event])


			

	return (
		<div className="container">
			<div className="search-ppl-list">
				<List>
					{scrapbooks.map(scb => (
						<ListItemButton key={scb._id} onClick={() => navigate(`/scrapbook/${scb._id}`)}>
						<ListItemText style={{"margin":0}} primary={scb.name} />
						</ListItemButton>))}
				</List>
			</div>

		</div>
	);
}