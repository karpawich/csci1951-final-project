import './App.css';
import React, {useState} from 'react'
import { Route, Routes } from 'react-router-dom'
import { LoginPage, AdaptiveDialog, Event, Events, Authenticated } from './components'

function App() {
  // dialog will open when content is not null
  const [dialogContent, setDialogContent] = useState(null)

  // used for refreshing content
  const [momentUploaded, setMomentUploaded] = useState(false)

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
      <AdaptiveDialog content={dialogContent} setDialogContent={setDialogContent} setMomentUploaded={setMomentUploaded}/>
    </div>
  );
}

export default App;
