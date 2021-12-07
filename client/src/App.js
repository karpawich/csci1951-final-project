import './App.css';
import React, {useEffect, useState} from 'react'

import {MainContent, PeopleMenu, EventMenu, AddButton, UploadDialog} from './components'

function App() {
  const [selectedPeople, setSelectedPeople] = useState([])

  const [selectedEvent, setSelectedEvent] = useState(null)

  return (
    <div className="main-wrapper">
      <div className="main-grid">
        <div className="header">header</div>
        <div className="people-menu"><PeopleMenu selectedPeople={selectedPeople} setSelectedPeople={ setSelectedPeople}/></div>
        <div className="event-menu"><EventMenu selectedPeople={selectedPeople} selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent} /></div>
        <div className="main"><MainContent /></div>
      </div> 
      <UploadDialog />
    </div>
  );
}

export default App;
