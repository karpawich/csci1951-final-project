import React, {useEffect, useState} from 'react'
import './PeopleMenu.css';

// material components
import {OutlinedInput, IconButton, List, ListItem, ListItemText, ListItemButton, autocompleteClasses} from '@mui/material'
import { Fab, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input, Button, useMediaQuery, useTheme } from '@mui/material';

// icons
import CancelIcon from '@mui/icons-material/Cancel'
// import HomeIcon from '@mui/icons-material/Home'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import AddIcon from '@mui/icons-material/Add'
import InfoIcon from '@mui/icons-material/Info';
import { grey, pink } from '@mui/material/colors';
import { textAlign } from '@mui/system';
import { UploadFile } from '..';
import { Center } from '@chakra-ui/react';
import { addEmailToEvent } from '../../actions';

export const PeopleMenu = (props) => {
    // can make this async from db, doesn't need to be a prop
    const { selectedEvent, selectedPeople, setSelectedPeople, setDialogContent, updatePeopleList } = props;
    //const allPeople = [{ email: 'ms', name: 'miku', lastName: 'suga' }, { email: 'mf', firstName: 'michele', lastName: 'foiani' }, { email: 'mk', firstName: 'max', lastName: 'karp' }] // temporary

    useEffect(() => {
        setSearchedPeople(selectedEvent?.emails ?? [])
    }, [selectedEvent, updatePeopleList])

    // const [searchedPeople, setSearchedPeople] = useState(selectedEvent.emails) // this throws an error
    const [searchedPeople, setSearchedPeople] = useState([])

    const removeSelectedPerson = (email) => setSelectedPeople(arr => arr.filter(person => person !== email))

    const selectedPeopleMap = () =>
        selectedPeople.map(person =>
            <ListItem key={person} secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => removeSelectedPerson(person)}>
                    <CancelIcon />
                </IconButton>
            }>
                        
                <ListItemText style={{"margin":0}} primary={person}/>
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
                    <ListItemText style={{"margin":0}} primary={person.substring(0, person.indexOf('@')).replaceAll('_', ' ')} />
                </ListItemButton>))

            //{/* <IconButton >
            //    <InfoIcon style={{"fontSize": 20, "margin": 0, "padding": 0}}/>
            //</IconButton> */}
            
    }

    // consider using null coalescing if one of these fields can be undefined
    // const queryBoolean = (person, queryString) => person.includes(queryString)
    const queryBoolean = (person, queryString) => person.includes(queryString) 

    const handlePersonSearch = event => {
        const query = event.target.value;
        const allPeople = selectedEvent?.emails ?? [];
        query.trim() ? setSearchedPeople(allPeople.filter(person => queryBoolean(person, query)))
            : setSearchedPeople(allPeople)
    }
       

    return (
        <div className="container">
            {/* <div className="home-btn">
                <IconButton style={{"margin": '0 auto'}}>
        
                    <MenuBookIcon style={{"fontSize": 40}} color="green"/>
                </IconButton>
            </div> */}

            <div style={{"marginTop":20, "marginBottom":10, "marginLeft":5, "fontSize":30, "fontWeight":'bold'}}>
                People
            </div>

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

            <IconButton onClick={() => setDialogContent('addUser')}>
                <AddIcon color="grey"/>
            </IconButton>

        </div>
    );
}

export const AddUserDialog = (props) => {
    const [email, setEmail] = useState('')

    const handleAdd = async () => {
        await addEmailToEvent(props.eventId, email)
        props.setUserAdded(prev => !prev)
        props.setContent(null)
    }

    const styles = {
        'button': {"marginTop": 10, "marginLeft": 'auto', "backgroundColor": '#FFFAF0'},
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
                <Button style={styles.button} onClick={() => handleAdd()} style={{ "marginTop": 10, "marginLeft": 130, "backgroundColor": '#FFFAF0' }} autoFocus >Add</Button>
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