import React, { useEffect, useState } from 'react'

import { addEmailToMoment, deleteEmailFromMoment, emailToName } from '../../actions'
import { VideoMoment, AudioMoment, ImageMoment } from '..'
import { Fab, Dialog, DialogActions, DialogContent, DialogContentText, ListItem, IconButton, List, ListItemText, DialogTitle, Input, Button, useMediaQuery, useTheme } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { AbsoluteCenter } from '@chakra-ui/react';

export const MomentView = (props) => {
	const { moment, setContent } = props

	const [emails, setEmails] = useState(moment.emails)
	const [email, setEmail] = useState('')
	const [listPeople, setListPeople] = useState([])

	const styles = {
		'button': {"marginTop": 10, "marginLeft": 130, "backgroundColor": '#FFFAF0'},
		'subtitle': {"marginTop": 20},
		'icon': {"marginLeft": 60},
		'trial': {"margin": '0 auto'},
		'blank1': {"width": 200, "marginTop": 20},
		'blank': {"width": 333, "marginTop": 20}
	}


	const handleAdd = async () => {
		try {
			console.log(await addEmailToMoment(moment._id, email))
			setEmail('')
		} catch (err) {
			return
		}
		setEmails(prev => [...prev, email])
	}

	const handleDelete = async (email) => {
		try {
			await deleteEmailFromMoment(moment._id, email)
		} catch (err) {
			return
		}
		setEmails(prev => prev.filter(e => e !== email))
	}


	const listPeopleMap = () => {
		// TODO: reduce extra calls here when event is changed. consider useMemo
		// console.log('fire')

		// make set to be more efficient for lookups
		// const emailSet = listPeople.reduce((s, person) => s.add(person), new Set())

		return listPeople.map(person =>

			// ( <ListItemButton key={person} disabled={emailSet.has(person)} selected={emailSet.has(person.email) }
			// onClick={() => setSelectedPeople(people => [...people, person])}>
			<ListItemText style={{"margin":0}} primary={emailToName(person)} />
		
		
			// </ListItemButton>)
				 
			)

	}


	return (
		<>
			<DialogTitle id="responsive-dialog-title">
			Title
			</DialogTitle>
			{/* <DialogSubtitle>
				Add People
			</DialogSubtitle> */}

			<DialogContent>
				<div>
					Add People to this Moment
				</div>
				


				<div>
					<div>
						<Input style={styles.blank} type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} value={email} required />
					</div>
					<div>
						<Button style={styles.button} onClick={() => handleAdd()} autoFocus >Add</Button>
					</div>
					<List style={{"marginTop":20}} subheader="Tagged People">
						{emails.map(e => (	
							<ListItem key={e} secondaryAction={
							<IconButton edge="end" aria-label="delete" onClick={() => handleDelete(e)}>
								<DeleteIcon />
							</IconButton>}>
								
						<ListItemText style={{"margin":0}} primary={emailToName(e)}/>
						</ListItem>))}

				</List>
				{/* <div>
					<Button style={styles.button}  autoFocus >Delete</Button>
				</div> */}
				</div>
			</DialogContent>
			<DialogActions>
				<Button style={{"position": 'absolute', "left": 10}} autoFocus onClick={() => props.setContent(null)}> 
					Delete Moment
				</Button>
				<Button autoFocus onClick={() => props.setContent(null)}>
					Close
				</Button>
			</DialogActions>
		</>
	);
}

