import './App.css';

import {MainContent, PeopleMenu, EventMenu} from './components'


function App() {
  return (
    <div className="main-grid">
        <div className="header">header</div>
        <div className="people-menu"><PeopleMenu /></div>
        <div className="event-menu"><EventMenu /></div>
        <div className="main"><MainContent /></div>
    </div>
  );
}

export default App;
