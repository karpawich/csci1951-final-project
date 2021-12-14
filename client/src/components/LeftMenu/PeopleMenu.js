import React, {useEffect, useState} from 'react'
import './PeopleMenu.css';

// material components
import {OutlinedInput, IconButton, List, ListItem, ListItemText, ListItemButton, autocompleteClasses} from '@mui/material'
import { Fab, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input, Button, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom'

// icons
import CancelIcon from '@mui/icons-material/Cancel'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete';
import { addEmailToEvent, deleteEmailFromEvent, emailToName} from '../../actions';

export const PeopleMenu = (props) => {
	// can make this async from db, doesn't need to be a prop
	const { event, selectedPeople, setSelectedPeople, setDialogContent, updatePeopleList } = props;

	useEffect(() => {
		setSearchedPeople(event?.emails ?? [])
	}, [event, updatePeopleList])

	// const [searchedPeople, setSearchedPeople] = useState(event.emails) // this throws an error
	const [searchedPeople, setSearchedPeople] = useState([])

	const removeSelectedPerson = (email) => setSelectedPeople(arr => arr.filter(person => person !== email))

	const selectedPeopleMap = () =>
		selectedPeople.map(person =>
			<ListItem key={person} secondaryAction={
				<IconButton edge="end" aria-label="delete" onClick={() => removeSelectedPerson(person)}>
					<CancelIcon />
				</IconButton>
			}>
								
			<ListItemText style={{"margin":0}} primary={emailToName(person)}/>
			</ListItem>
		)
	
	const searchedPeopleMap = () => {
		// TODO: reduce extra calls here when event is changed. consider useMemo
		// console.log('fire')

		// make set to be more efficient for lookups
		const emailSet = selectedPeople.reduce((s, person) => s.add(person), new Set())

		return searchedPeople.map(person =>

			( <ListItemButton key={person} disabled={emailSet.has(person)} selected={emailSet.has(person.email) }
			onClick={() => setSelectedPeople(people => [...people, person])}>
					<ListItemText style={{"margin":0}} primary={emailToName(person)} />
			</ListItemButton>))

		// {/* <IconButton >
		//    <InfoIcon style={{"fontSize": 20, "margin": 0, "padding": 0}}/>
		// </IconButton> */}
					
	}

	// consider using null coalescing if one of these fields can be undefined
	// const queryBoolean = (person, queryString) => person.includes(queryString)
	const queryBoolean = (person, queryString) => person.includes(queryString) 

	const handlePersonSearch = event => {
		const query = event.target.value;
		const allPeople = event?.emails ?? [];
		query.trim() ? setSearchedPeople(allPeople.filter(person => queryBoolean(person, query)))
				: setSearchedPeople(allPeople)
	}

			

	return (
		<>
			<div>
				<OutlinedInput style={{height:30, "marginBottom":10}} type="search" fullWidth={true} placeholder="Search for people" onChange={handlePersonSearch}/>
			</div>

			<div className="selected-ppl-list" hidden={selectedPeople.length === 0}>
				<List style={{"marginTop":20}} subheader="Selected People">
						{selectedPeopleMap()}
				</List>
			</div>

			

			<div className="search-ppl-list">
				{/* <List subheader="People"> */}
				<List>
					{searchedPeopleMap()}
				</List>
			</div>

			<IconButton onClick={() => setDialogContent(<AddUserDialog setContent={setDialogContent} eventId={event._id} />)}>
				<AddIcon color="grey"/>
			</IconButton>

			<IconButton onClick={() => setDialogContent(<DeleteUserDialog setContent={setDialogContent} eventId={event._id}/>)}>
				<DeleteIcon color="grey"/>
			</IconButton>
		</>
	);
}

export const AddUserDialog = (props) => {
	const [email, setEmail] = useState('')
	const navigate = useNavigate()

	const handleAdd = async () => {
		await addEmailToEvent(props.eventId, email)
		//props.setUserAdded(prev => !prev)
		navigate(`/event/${props.eventId}`)
		props.setContent(null)
		
	}

	const styles = {
		'button': {"marginTop": 10, "marginLeft": 130, "backgroundColor": '#FFFAF0'},
		'subtitle': {"marginTop": 20},
		'icon': {"marginLeft": 60},
		'trial': {"margin": '0 auto'},
		'blank1': {"width": 200, "marginTop": 20},
		'blank': {"width": 333, "marginTop": 20}
	}

	return (
	<>
		<DialogTitle id="responsive-dialog-title">
			Add People
		</DialogTitle>
		<DialogContent>
			<div>
				<div>
					<Input style={styles.blank} type="email" placeholder="User email" onChange={(e) => setEmail(e.target.value)} required />
				</div>
				<div>
					<Button style={styles.button} onClick={() => handleAdd()} autoFocus >Add</Button>
				</div>
			</div>
		</DialogContent>
		<DialogActions>
			<Button autoFocus onClick={() => props.setContent(null)}>
				Close
			</Button>
		</DialogActions>
	</>
  )
}

export const DeleteUserDialog = (props) => {
	const [email, setEmail] = useState('')
	const navigate = useNavigate()

	const handleDelete = async () => {
		await deleteEmailFromEvent(props.eventId, email)
		//props.setUserDeleted(prev => !prev)
		props.setContent(null)
		navigate(`/event/${props.eventId}`) // only works for the first time
	}

	const styles = {
		'button': {"marginTop": 10, "marginLeft": 130, "backgroundColor": '#FFFAF0'},
		'subtitle': {"marginTop": 20},
		'icon': {"marginLeft": 60},
		'trial': {"margin": '0 auto'},
		'blank1': {"width": 200, "marginTop": 20},
		'blank': {"width": 333, "marginTop": 20}
	}

	return (
	<>
		<DialogTitle id="responsive-dialog-title">
			Delete People
		</DialogTitle>
		<DialogContent>
			<div>

				<div>
						<Input style={styles.blank} type="email" placeholder="User email" onChange={(e) => setEmail(e.target.value)} required />
				</div>
				<div>
						<Button style={styles.button} onClick={() => handleDelete()} autoFocus>Delete</Button>
				</div>
			</div>
		</DialogContent>
		<DialogActions>
			<Button autoFocus onClick={() => props.setContent(null)}>
				Close
			</Button>
		</DialogActions>
	</>
  )
}