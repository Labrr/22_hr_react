import './App.css';
import './Components/Calendar/Calendar.css';
import { React, useState, useEffect } from 'react';
import Calendar from './Components/Calendar/Calendar'
import Player from './Components/Player'
//Images
import bghero from './Images/Other/hallobg.png'
import SideMenu from './Pages/SideMenu';
import axios from 'axios';


function App() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);



  useEffect(() => {
    let isApiSubscribed = true;
    
     console.log(weekStart(new Date()));
     console.log(weekEnd(new Date()));
      let date = new Date();
      let start = weekStart(date);
      let end = weekEnd(date);


      axios.get(`http://localhost:8080/api/calendar/${ start} / ${ end }`)
      .then(function (response) {
        // handle success
        if(isApiSubscribed){
          setIsLoaded(true);
          setItems(response.data)
          console.log(response.data)
        }
      })
      .catch(function (err) {
        setError(err)
        // handle error
        console.log(err);
      })
      //cleanup
      return () => {
        // cancel the subscription
        isApiSubscribed = false;
    };
  }, []);



  Date.prototype.addDays = function(days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
  }

  function weekEnd(dateNow){
    return dateNow.addDays(7 - dateNow.getDay())
  }
  function weekStart(dateNow){
    return dateNow.addDays(0)
  }

 
  return (
    <div className="App">
      {/* <Player 
        url="https://t4.bcbits.com/stream/6e4770fb84a399b4566bc5cfd7bc534d/mp3-128/2667551507?p=0&ts=1644232117&t=a657628b4f22e91991cc8fb87015eb8431fdbdee&token=1644232117_539f1162f372b2aa6ecd7ad9cd4e808131b4c1b3"
      /> */}
      <SideMenu />


      <BackgroundHero />
      <CalendarMenu>
        {/* <div>Clock</div>   */}

        <Calendar_ >
          <Calendar items={items} isLoaded={isLoaded} error={error} />
        </Calendar_>

      </CalendarMenu>
     

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


function BackgroundHero() {
  return(
    <div className='bg-hero'>
      <img src={bghero}></img>
    </div>
  )

}


export default App;
