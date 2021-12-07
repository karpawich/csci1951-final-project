import React, {useEffect, useState} from 'react'
import './PeopleMenu.css';

// material components
import {OutlinedInput, IconButton, List, ListItem, ListItemText, ListItemButton} from '@mui/material'

// icons
import CancelIcon from '@mui/icons-material/Cancel'
import HomeIcon from '@mui/icons-material/Home'

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
                        
                <ListItemText primary={person.firstName}/>
            </ListItem>
        )
    
    const searchedPeopleMap = () => {
        // TODO: reduce extra calls here when event is changed. consider useMemo
        // console.log('fire')

        // make set to be more efficient for lookups
        const emailSet = selectedPeople.reduce((s, person) => s.add(person.email), new Set())

        return searchedPeople.map(person =>
            <ListItemButton key={person.email} disabled={emailSet.has(person.email)} selected={emailSet.has(person.email)}
                onClick={() => setSelectedPeople(people => [...people, person])}>
                <ListItemText primary={person.firstName} />
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
                <OutlinedInput type="search" fullWidth={true} placeholder="Search for people" onChange={handlePersonSearch}/>
            </div>

            <div className="search-ppl-list">
                <List subheader="People">
                    {searchedPeopleMap()}
                </List>
            </div>

        </div>
    );
}