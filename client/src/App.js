import './App.css';
import React, {useState} from 'react'
import { Route, Routes } from 'react-router-dom'
import { LoginPage, AdaptiveDialog, Event, Events, Authenticated } from './components'
import { Scrapbook } from './components';

function App() {
  // dialog will open when content is not null
  const [dialogContent, setDialogContent] = useState(null)

  return (
    <div className='main-wrapper'>
      <Routes>
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/scrapbook/:id' element={
          <Authenticated element={<Scrapbook setDialogContent={setDialogContent} />} />
        } />
        <Route path='/event/:id' element={
          <Authenticated element={<Event setDialogContent={setDialogContent} />} />
        } />
        <Route path='*' element={
          <Authenticated element={<Events setDialogContent={setDialogContent} />}/>
        }/>  
      </Routes>
      <AdaptiveDialog content={dialogContent} setDialogContent={setDialogContent}/>
    </div>
  );
}

export default App;
