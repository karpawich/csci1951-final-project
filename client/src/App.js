import './App.css';
import React, {useEffect, useState} from 'react'

import {MainContent, PeopleMenu, EventMenu, UploadDialog, LoginPage} from './components'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [selectedPeople, setSelectedPeople] = useState([])

  const [selectedEvent, setSelectedEvent] = useState(null)

  const [dialogOpen, setDialogOpen] = useState(false);

  return (
   <>
    {
      isLoggedIn?
          (
            <div className="main-wrapper">
              <UploadDialog open={dialogOpen} setOpen={setDialogOpen} contentType={"miku"}/>
              <div className="main-grid">
                <div className="header">header</div>
                <div className="people-menu"><PeopleMenu selectedPeople={selectedPeople} setSelectedPeople={ setSelectedPeople}/></div>
                <div className="event-menu"><EventMenu selectedPeople={selectedPeople} selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent} /></div>
                <div className="main"><MainContent /></div>
              </div> 
            </div>
          )
          : <LoginPage setIsLoggedIn={setIsLoggedIn} />}
      </>
  );
}

export default App;
