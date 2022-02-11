import './App.css';
import './Components/Calendar/Calendar.css';
import { React, useState, useEffect } from 'react';

import { BackgroundVisual } from './Components/ThreeVisuals/BackgroundVisual';

//Images
import SideMenu from './Pages/SideMenu';
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
    console.log(firstday, "first")
    return firstday;
  }

  function w() {
  }


  {/* <Player 
    url="https://t4.bcbits.com/stream/6e4770fb84a399b4566bc5cfd7bc534d/mp3-128/2667551507?p=0&ts=1644232117&t=a657628b4f22e91991cc8fb87015eb8431fdbdee&token=1644232117_539f1162f372b2aa6ecd7ad9cd4e808131b4c1b3"
  /> */}

  

  return (
    <div className="App">
      <SideMenu isLoaded={isLoaded} weekEvents={weekEvents} error={error}>
        
      
                
      </SideMenu>

      <BackgroundVisual />
    </div>
  );
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
  // const [ open, setOpen ] = useState(false);
  // const [count, setCount] = useState(0);
  
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
