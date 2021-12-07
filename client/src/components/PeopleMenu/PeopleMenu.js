import React, {useEffect, useState} from 'react'
import './PeopleMenu.css';

// material components
import {OutlinedInput, IconButton, List, ListItem, ListItemText, ListItemButton} from '@mui/material'

// icons
import CancelIcon from '@mui/icons-material/Cancel'
import HomeIcon from '@mui/icons-material/Home'

export const PeopleMenu = () => {
    const [selectedPeople, setSelectedPeople] = useState([]);
    const [searchedPeople, setSearchedPeople] = useState([]);

    useEffect(() => {
        setSelectedPeople(arr => [...arr, { email: 'mf', firstName: 'michele' }])
        setSearchedPeople(arr => [...arr, { email: 'ms', firstName: 'miku' }, { email: 'mf', firstName: 'michele' }, { email: 'mk', firstName: 'max' }])
    }, [])

    const removeSelectedPerson = (email) => setSelectedPeople(arr => arr.filter(person => person.email !== email))

    const selectedPeopleMap = () =>
        selectedPeople.map(person =>
            <ListItem key={person.email} secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => removeSelectedPerson(person.email)}>
                    <CancelIcon />
                </IconButton>
            }>
                        
                <ListItemText primary={person.firstName}/>
            </ListItem>
        )
    
    const searchedPeopleMap = () => {
        // make set to be more efficient for lookups
        const emailSet = selectedPeople.reduce((s, person) => s.add(person.email), new Set())

        return searchedPeople.map(person =>
            <ListItemButton key={person.email} disabled={emailSet.has(person.email)} selected={emailSet.has(person.email)}
                onClick={() => setSelectedPeople(people => [...people, person])}>
                <ListItemText primary={person.firstName} />
            </ListItemButton>)
    }
       

    return (
        <div className="container">
            <div className="home-btn">
                <IconButton>
                    <HomeIcon color="green"/>
                </IconButton>
            </div>

            <div className="selected-ppl-list" hidden={selectedPeople.length === 0}>
                <List subheader="Selected People">
                    {selectedPeopleMap()}
                </List>
            </div>

            <div>
                <OutlinedInput type="search" fullWidth={true} placeholder="Search for people"/>
            </div>

            <div className="search-ppl-list">
                <List subheader="Searched People">
                    {searchedPeopleMap()}
                </List>
            </div>

        </div>
    );
}