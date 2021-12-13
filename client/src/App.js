import './App.css';
import React, {useState} from 'react'
import { Route, Routes } from 'react-router-dom'
import { LoginPage, AdaptiveDialog, Event, Events, Authenticated, AddButton } from './components'

function App() {
  // dialog will open when content is not null
  const [dialogContent, setDialogContent] = useState(null)

  return (
    <div className='main-wrapper'>
      <Routes>
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/event/:id' element={
          <Authenticated element={<Event setDialogContent={setDialogContent} />} />
        } />
        <Route path='*' element={
          <Authenticated element={<Events setDialogContent={setDialogContent} />}/>
        }/>  
      </Routes>
      <AdaptiveDialog content={dialogContent} setDialogContent={setDialogContent}/>
      <AddButton setDialogContent={setDialogContent}/>
    </div>



  // // used for refreshing content
  // const [eventCreated, setEventCreated] = useState(false)
  // const [userAdded, setUserAdded] = useState(false)
  // const [userDeleted, setUserDeleted] = useState(false)
  // const [momentUploaded, setMomentUploaded] = useState(false)
  // const [updatePeopleList, setUpdatePeopleList] = useState(false)
  



  // return (
  //  <>
    
  //   {
  //     isLoggedIn?
  //         (
  //           <div className="main-wrapper">
  //             <AddButton setDialogContent={setDialogContent}/>
  //             <AdaptiveDialog content={dialogContent} setContent={setDialogContent} selectedEvent={selectedEvent} setEventCreated={setEventCreated} setUserAdded={setUserAdded} setUserDeleted={setUserDeleted} setMomentUploaded={setMomentUploaded}/>
  //             <div className="main-grid">
  //               <div className="header">header</div>
  //               <div className="event-menu"><EventMenu selectedPeople={selectedPeople} selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent} setDialogContent={setDialogContent} eventCreated={eventCreated} userAdded={userAdded} setUpdatePeopleList={setUpdatePeopleList}/></div>
  //               <div className="people-menu"><PeopleMenu selectedPeople={selectedPeople} setSelectedPeople={setSelectedPeople} selectedEvent={selectedEvent} setDialogContent={setDialogContent} userAdded={userAdded} userDeleted={userDeleted} updatePeopleList={updatePeopleList}/></div>
  //               <div className="main"><MainContent selectedEvent={selectedEvent} momentUploaded={momentUploaded} setEventCreated={setEventCreated} setSelectedEvent={setSelectedEvent}/></div>
  //             </div> 
  //           </div>
  //         )
  //         : <LoginPage setIsLoggedIn={setIsLoggedIn} />}
  //     </>
  );
}

export default App;
