import React, {useEffect, useState} from 'react'
import './PeopleMenu.css';

// material components
import {OutlinedInput, IconButton, List, ListItem, ListItemText, ListItemButton} from '@mui/material'

// icons
import CancelIcon from '@mui/icons-material/Cancel'
// import HomeIcon from '@mui/icons-material/Home'
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AddIcon from '@mui/icons-material/Add'
import { grey, pink } from '@mui/material/colors';
import { textAlign } from '@mui/system';

export const PeopleMenu = (props) => {
    // can make this async from db, doesn't need to be a prop
    const { selectedPeople, setSelectedPeople } = props;
    const allPeople = [{ email: 'ms', firstName: 'miku', lastName: 'suga' }, { email: 'mf', firstName: 'michele', lastName: 'foiani' }, { email: 'mk', firstName: 'max', lastName: 'karp' }];


    const [searchedPeople, setSearchedPeople] = useState(allPeople);

    useEffect(() => {
    }, [])

    const removeSelectedPerson = (email) => setSelectedPeople(arr => arr.filter(person => person.email !== email))

    const selectedPeopleMap = () =>
        selectedPeople.map(person =>
            <ListItem key={person.email} secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => removeSelectedPerson(person.email)}>
                    <CancelIcon />
                </IconButton>
            }>
                        
                <ListItemText style={{"margin":0}} primary={person.firstName}/>
            </ListItem>
        )
    
    const searchedPeopleMap = () => {
        // TODO: reduce extra calls here when event is changed. consider useMemo
        // console.log('fire')

        // make set to be more efficient for lookups
        const emailSet = selectedPeople.reduce((s, person) => s.add(person.email), new Set())

        return searchedPeople.map(person =>
            <ListItemButton key={person.email} disabled={emailSet.has(person.email)} selected={emailSet.has(person.email) }
                onClick={() => setSelectedPeople(people => [...people, person])}>
                <ListItemText style={{"margin":0}} primary={person.firstName} />
            </ListItemButton>)
    }

    // consider using null coalescing if one of these fields can be undefined
    const queryBoolean = (person, queryString) =>
        person.email.includes(queryString) ||
        person.firstName.includes(queryString) ||
        person.lastName.includes(queryString)

    const handlePersonSearch = event => {
        const query = event.target.value;
        query.trim() ? setSearchedPeople(allPeople.filter(person => queryBoolean(person, query)))
            : setSearchedPeople(allPeople)
    }
       

    return (
        <div className="people-container">
            <div className="home-btn">
                <IconButton >
                    {/* Add action */}
                    <MenuBookIcon style={{"fontSize": 40}} color="green"/>
                </IconButton>
            </div>

            <div style={{"marginTop":30, "marginBottom":10, "marginLeft":5, "fontSize":30, "fontWeight":'bold'}}>
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

            <IconButton>
                {/* Add action */}
                <AddIcon color="grey"/>
            </IconButton>

        </div>
    );
}