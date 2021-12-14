import React, {useState, useCallback, useEffect} from 'react'
import { useParams, useLocation } from 'react-router-dom'
import {MainContent, LeftMenu, AddButton } from '..'
import { getEvent } from '../../actions'
import './Event.css';

export const Event = (props) => {
  const { setDialogContent } = props

  const { id } = useParams();
  const { state: e } = useLocation();

  const [event, setEvent] = useState(e);
  const [selectedPeople, setSelectedPeople] = useState([])

  const [momentsUpdate, setMomentsUpdate] = useState(false)

  const [startDate, setStartDate] = useState(new Date(event?.startTimestamp))
  const [endDate, setEndDate] = useState(new Date())
  const [sortType, setSortType] = useState('new->old')
  const [filterSort, setFilterSort] = useState(false)

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
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setSortType={setSortType}
            setFilterSort={setFilterSort}
            startDate={startDate}
            endDate={endDate}
            sortType={sortType}
            filterSort={filterSort}
          />
        </div>
        <div className="main">
          <MainContent event={event} setDialogContent={setDialogContent} filterSort={filterSort} startDate={startDate} endDate={endDate} sortType={sortType} selectedPeople={selectedPeople} momentsUpdate={momentsUpdate}/>
        </div>
      </div> 
      <AddButton setDialogContent={setDialogContent} event={event} setMomentsUpdate={setMomentsUpdate}/>
    </>
  ))
}