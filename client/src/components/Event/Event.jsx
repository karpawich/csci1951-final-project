import React, {useState, useCallback, useEffect} from 'react'
import { useParams, useLocation } from 'react-router-dom'
import {MainContent, LeftMenu } from '..'
import { getEvent } from '../../actions'
import './Event.css';

export const Event = (props) => {
  const { setDialogContent } = props

  const { id } = useParams();
  const { state: e } = useLocation();

  const [event, setEvent] = useState(e);
  const [selectedPeople, setSelectedPeople] = useState([])
  const [userAdded, setUserAdded] = useState(false)
  const [userDeleted, setUserDeleted] = useState(false)
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
      <div className="main-grid">
        <div className="people-menu">
          <LeftMenu
            selectedPeople={selectedPeople}
            setSelectedPeople={setSelectedPeople}
            event={event}
            setDialogContent={setDialogContent}
            userAdded={userAdded}
            userDeleted={userDeleted}
            updatePeopleList={updatePeopleList}
          />
        </div>
        <div className="main">
          <MainContent event={event} setDialogContent={setDialogContent}/>
        </div>
      </div> 
    </>
  ))
}