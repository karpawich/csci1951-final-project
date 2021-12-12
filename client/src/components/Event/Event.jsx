import React, {useState, useCallback, useEffect} from 'react'
import { useParams, useLocation } from 'react-router-dom'
import {MainContent, PeopleMenu, AddButton } from '..'
import { getEvent } from '../../actions'
import './Event.css';

export const Event = (props) => {
  const { setDialogContent } = props

  const { id } = useParams();
  const { state: e } = useLocation();

  const [event, setEvent] = useState(e);
  const [selectedPeople, setSelectedPeople] = useState([])
  const [userAdded, setUserAdded] = useState(false)
  const [momentUploaded, setMomentUploaded] = useState(false)
  const [updatePeopleList, setUpdatePeopleList] = useState(false)

  useEffect(() => {
    if (!e) {
      (async () => {
        const { event } = await getEvent(id);
        setEvent(event);
      })()
    }
  }, [e, id])

  return (event && (
    <>
      <AddButton setDialogContent={setDialogContent}/>
      <div className="main-grid">
        <div className="people-menu">
          <PeopleMenu
            selectedPeople={selectedPeople}
            setSelectedPeople={setSelectedPeople}
            selectedEvent={event}
            setDialogContent={setDialogContent}
            userAdded={userAdded}
            updatePeopleList={updatePeopleList}
          />
        </div>
        <div className="main">
          <MainContent selectedEvent={event} momentUploaded={momentUploaded}/>
        </div>
      </div> 
    </>
  ))
}