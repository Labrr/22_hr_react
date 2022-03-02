import './Components/Calendar/Calendar.css';
import { useState, useEffect } from 'react';

import { BackgroundVisual } from './Components/BackgroundVisual/BackgroundVisual';
import Calendar from './Components/Calendar/Calendar';
import { Preview } from './Components/NextUpPreview/NextUpPreview';
import AudioPlayer from './Components/AudioPlayer/AudioPlayer'
import Home from './Routes/Home'

import moment from 'moment'

import NavBar from './Nav';
import axios from 'axios';

function App() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [weekEvents, setWeekEvents] = useState([])
  
  
  useEffect(() => {
    let isApiSubscribed = true;
    if(isApiSubscribed){ 
      let date = new Date();
      //todo useMEMO
      // getEvents(
      //   weekStart(date),
      //   weekEnd(date)
      //   ); 
      // }

      var startOfWeek = moment().startOf('isoWeek').toDate();
      var endOfWeek   = moment().endOf('isoWeek').toDate();
      
      getEvents(
        startOfWeek,
        endOfWeek
        ); 
      }
      

      //cleanup
      return () => {
        // cancel the subscription
        isApiSubscribed = false;
    };
  }, []);


  function getEvents(start, end) {
    axios.get(`https://api.lasseborntraeger.de/calendar/${ start} / ${ end }`)
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
    return lastday;
  }
  function weekStart(currentDate){
    var firstday = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 3 )).toUTCString();
    return firstday;
  }


  return (
    <div className="App">
     
      <NavBar>
        <Calendar active={true} week={isLoaded ?  weekEvents : false} error={error}/>

        <Home name="info"/>

      </NavBar>


      {/* <h1>Hallo {moment().startOf('isoWeek').toDate()}</h1> */}

      <BackgroundVisual week={isLoaded ?  weekEvents : false}/>


{/* 
      <Marquee 
        className="marqu"
        gradient={false}
        pauseOnClick={true}
      >
          HALLLLLLO
      </Marquee> */}
      
      
      {/* <AudioPlayer url="https://halloradi0.out.airtime.pro/halloradi0_a" /> */}

      {/* <NavB>
        <Calendar week={isLoaded ?  weekEvents : false} error={error}/>
      </NavB> */}

      <Preview week={isLoaded ?  weekEvents : false}/>

   
    </div>
  );
}


export default App;
