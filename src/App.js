import './Components/Calendar/Calendar.css';
import { React, useState, useEffect } from 'react';

import { BackgroundVisual } from './Components/BackgroundVisual/BackgroundVisual';
import Calendar from './Components/Calendar/Calendar';
import Weekday from './Components/Weekday/Weekday';
import { Preview } from './Components/NextUpPreview/NextUpPreview';
import AudioPlayer from './Components/AudioPlayer/AudioPlayer'

import axios from 'axios';



function App() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [weekEvents, setWeekEvents] = useState([])
  
  
  useEffect(() => {
    let isApiSubscribed = true;
    if(isApiSubscribed){ 
        let date = new Date();
        getEvents(
            weekStart(date),
            weekEnd(date)
            ); 
      }
      //cleanup
      return () => {
        // cancel the subscription
        isApiSubscribed = false;
    };
  }, []);

  function getEvents(start, end) {
    axios.get(`http://localhost:8080/api/calendar/${ start} / ${ end }`)
    .then(function (response) {
      // handle success
      const weekDataRaw = response.data;
      setWeekEvents(sortByDay(weekDataRaw))
      setIsLoaded(true);
     })
    .catch(function (err) {
      setError(err) 
      setIsLoaded(false)
      return -1;
    })
  }


  function filterDay(week, day) {
    var eventsThatDay = week.filter(function (el) {    
      let parseDayDate = new Date(el.start)
        return parseDayDate.getDay() === day
    });
    
    return eventsThatDay;
  }
  
  function sortByDay(weekRawData) {        
    const week = [];

    for (let iday = 0; iday < 7; iday++) {
      const day = filterDay(weekRawData, iday);
      week[iday] = day;
    }    
    return week;
  }

  
  Date.prototype.addDays = function(days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
  }

  function weekEnd(currentDate){
    var lastday = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 7)).toUTCString();
    console.log(lastday, "last")
    return lastday;
  }
  function weekStart(currentDate){
    var firstday = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 3 )).toUTCString();
    return firstday;
  }


  return (
    <div className="App">
 
      <BackgroundVisual/>
 
      <AudioPlayer url="https://halloradi0.out.airtime.pro/halloradi0_a" />

      <NavB>
        <Calendar week={isLoaded ?  weekEvents : false} error={error}/>
      </NavB>

      <Preview week={isLoaded ?  weekEvents : false}/>
   
    </div>
  );
}


function NavB(props) {
  const [ open, setOpen ] = useState(false);
  
  

  return(
      <div className="navbar">
        <a className='calButton' onClick={() => setOpen(!open)} href='#'>Calendar</a>
        { open && props.children }
      </div>
  )

}


function Calendar_(props) {
 
  const [ open, setOpen ] = useState(false);
  
  return(
    <div>
      <a href='#' className='calendar-btn' onClick={() => setOpen(!open)}>
        <div>Calendar {open ? <i className="arrow down"></i> : <i className="arrow"></i> }</div>
      </a>
      { open && props.children }
    </div>

  ) 
}





function CalendarMenu(props) {
  const [clock, setClock] = useState(new Date);
  
  useEffect(() => {
    setClock(new Date)
    
  }, []);
 
  return(
    <div className='cal-menu-container'>
      <div className="cal-menu">
        { props.children }
      </div>
    </div>
  )
}


export default App;
