import React, {useEffect, useState} from 'react'
import './PeopleMenu.css';

// material components
import { IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'

// icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import { PeopleMenu } from '..'
import { ScrapbookMenu } from '.';

export const LeftMenu = (props) => {
	// can make this async from db, doesn't need to be a prop
    const { event, selectedPeople, setSelectedPeople, setDialogContent, updatePeopleList } = props;
    
	const navigate = useNavigate()
	const handleBack = async () => {
		navigate(`/event/`)
	}

	return (
		<div className="container">
			<div className="home-btn">
				<IconButton style={{"margin": '0 auto'}} onClick={() => handleBack()}>
					<ArrowBackIcon style={{"fontSize": 40}} color="green"/>
				</IconButton>
            </div>
            
            <div>
                <PeopleMenu event={event} selectedPeople={selectedPeople} setSelectedPeople={setSelectedPeople} setDialogContent={setDialogContent} updatePeopleList={updatePeopleList}/>
            </div>

            <div>
                <ScrapbookMenu event={event}/>
            </div>

		</div>
	);
}