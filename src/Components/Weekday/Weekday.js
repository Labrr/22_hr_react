import React, { useEffect, useState } from 'react';
import './Weekday.css'

function Weekday({ daysEvents, day }) {

  function dayFormat(d) {
    return d.toLocaleDateString('en-EN', { weekday: 'long' })
  }

  function dayOfWeekAsString(dayIndex) {
    return ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][dayIndex] || '';
  }
  function shortDayOfWeekAsString(dayIndex) {
    return ["SUN", "MON","TUE","WED","THU","FRI","SAT","HIDE"][dayIndex] || '';
  }

  function dateToTimeString(evStart){
    let tmp_d = new Date(evStart);
    let mins = ('0'+tmp_d.getMinutes()).slice(-2);
    let h = ('0'+tmp_d.getHours()).slice(-2);
    return h + "" + mins;
  }
  
  if (!daysEvents) {
    return <div> Laden, laden, laden...</div>;
  } else {
    const dayString = shortDayOfWeekAsString(day);
   
    return(
      <div className="weekday" id={dayString}>
        <h2>{dayString}</h2>
      
        {daysEvents.map(show => (
              <li key={show.start}> 
                <span className="evTime">{dateToTimeString(show.start)}</span>  
                <span className="evName" > {show.summary}</span>     
              </li>
            ))}

      </div>
  )
  } 
}

export default Weekday;
