import './App.css';
import React, {useEffect, useState} from 'react'

import {MainContent, PeopleMenu, EventMenu, LoginPage, AdaptiveDialog, AddButton} from './components'
import { getEmail } from './actions';

function App() {
  // start logged in for debug
  const [isLoggedIn, setIsLoggedIn] = useState(getEmail() !== '')

  const [selectedPeople, setSelectedPeople] = useState([])

  const [selectedEvent, setSelectedEvent] = useState(null)

  // dialog will open when content is not null
  const [dialogContent, setDialogContent] = useState(null)

  // used for refreshing content
  const [eventCreated, setEventCreated] = useState(false)
  const [userAdded, setUserAdded] = useState(false)
  const [momentUploaded, setMomentUploaded] = useState(false)
  const [updatePeopleList, setUpdatePeopleList] = useState(false)
  



  return (
   <>
    
    {
      isLoggedIn?
          (
            <div className="main-wrapper">
              <AddButton setDialogContent={setDialogContent}/>
              <AdaptiveDialog content={dialogContent} setContent={setDialogContent} selectedEvent={selectedEvent} setEventCreated={setEventCreated} setUserAdded={setUserAdded} setMomentUploaded={setMomentUploaded}/>
              <div className="main-grid">
                <div className="header">header</div>
                <div className="event-menu"><EventMenu selectedPeople={selectedPeople} selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent} setDialogContent={setDialogContent} eventCreated={eventCreated} userAdded={userAdded} setUpdatePeopleList={setUpdatePeopleList}/></div>
                <div className="people-menu"><PeopleMenu selectedPeople={selectedPeople} setSelectedPeople={setSelectedPeople} selectedEvent={selectedEvent} setDialogContent={setDialogContent} userAdded={userAdded} updatePeopleList={updatePeopleList}/></div>
                <div className="main"><MainContent selectedEvent={selectedEvent} momentUploaded={momentUploaded} setEventCreated={setEventCreated} setSelectedEvent={setSelectedEvent}/></div>
              </div> 
            </div>
          )
          : <LoginPage setIsLoggedIn={setIsLoggedIn} />}
      </>
  );
}

export default App;
