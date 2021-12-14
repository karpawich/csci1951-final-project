import React, {useEffect, useState} from 'react'
import './PeopleMenu.css';

// material components
import { IconButton, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'

// icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import { PeopleMenu } from '.'
import { ScrapbookMenu } from '.';

export const LeftMenu = (props) => {
	// can make this async from db, doesn't need to be a prop
    const { event, selectedPeople, setSelectedPeople, setDialogContent, updatePeopleList } = props;
    
	const navigate = useNavigate()
	const handleBack = async () => {
		navigate(`/event/`)
    }

    const [peopleOpen, setPeopleOpen] = useState(false)
    const [scrapbookOpen, setScrapbookOpen] = useState(false)


	return (
		<div className="container">
			<div className="home-btn">
				<IconButton style={{"margin": '0 auto'}} onClick={() => handleBack()}>
					<ArrowBackIcon style={{"fontSize": 40}} color="green"/>
				</IconButton>
            </div>
            
            <div className="title-flex">
                <div style={{"marginTop":10, "marginBottom":10, "marginLeft":5, "fontSize":30, "fontWeight":'bold'}}>
				    People
			    </div>
                <IconButton style={{"margin": '0 auto'}} onClick={() => setPeopleOpen(prev => !prev)}>
                    {peopleOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
            </div>
            {peopleOpen ?
                <PeopleMenu event={event} selectedPeople={selectedPeople} setSelectedPeople={setSelectedPeople} setDialogContent={setDialogContent} updatePeopleList={updatePeopleList} />
                : <></>
            }

            <div className="title-flex">
                <div style={{"marginTop":10, "marginBottom":10, "marginLeft":5, "fontSize":30, "fontWeight":'bold'}}>
				    Scrapbook
			    </div>
                <IconButton style={{"margin": '0 auto'}} onClick={() => setScrapbookOpen(prev => !prev)}>
                    {scrapbookOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
            </div>
            {scrapbookOpen ? <ScrapbookMenu /> : <></>}

		</div>
	);
}