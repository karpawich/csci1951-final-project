import React, {useEffect, useState} from 'react'
import './PeopleMenu.css';

// material components
import {OutlinedInput, IconButton, List, ListItem, ListItemText, ListItemButton, autocompleteClasses} from '@mui/material'
import { Fab, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input, Button, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom'

// icons
import CancelIcon from '@mui/icons-material/Cancel'
// import HomeIcon from '@mui/icons-material/Home'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InfoIcon from '@mui/icons-material/Info';
import { grey, pink } from '@mui/material/colors';
import { textAlign } from '@mui/system';
import { UploadFile } from '..';
import { Center } from '@chakra-ui/react';
import { addEmailToEvent, deleteEmailFromEvent} from '../../actions';

export const ScrapbookMenu = (props) => {
	// can make this async from db, doesn't need to be a prop
	const { event } = props;

	useEffect(() => {
        (async () => {
          // todo: get scrapbooks by event  
        })()
	}, [event])


			

	return (
		<div className="container">
			<div className="search-ppl-list">
				<List>
                    {}
				</List>
			</div>

		</div>
	);
}