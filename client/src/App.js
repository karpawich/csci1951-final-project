import './App.css';
import React, {useEffect, useState} from 'react'

import {MainContent, PeopleMenu, EventMenu, LoginPage, AdaptiveDialog, AddButton} from './components'
import { getEmail } from './actions';

function App() {
  // start logged in for debug
  const [isLoggedIn, setIsLoggedIn] = useState(!!getEmail()) // changed

  const [selectedPeople, setSelectedPeople] = useState([])

  const [selectedEvent, setSelectedEvent] = useState(null)

  // dialog will open when content is not null
  const [dialogContent, setDialogContent] = useState(null)


  return (
   <>
    
    {
      isLoggedIn?
          (
            <div className="main-wrapper">
              <AddButton setDialogContent={setDialogContent}/>
              <AdaptiveDialog content={dialogContent} setContent={setDialogContent}/>
              <div className="main-grid">
                <div className="header">header</div>
                <div className="event-menu"><EventMenu selectedPeople={selectedPeople} selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent} setDialogContent={setDialogContent}/></div>
                <div className="people-menu"><PeopleMenu selectedPeople={selectedPeople} setSelectedPeople={ setSelectedPeople} setDialogContent={setDialogContent}/></div>
                <div className="main"><MainContent /></div>
              </div> 
            </div>
          )
          : <LoginPage setIsLoggedIn={setIsLoggedIn} />}
      </>
  );
}

export default App;
