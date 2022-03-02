import { useEffect, useState } from 'react';
import './Weekday.css'

function Weekday({ daysEvents, day }) {

  function dayFormat(d) {
    return d.toLocaleDateString('en-EN', { weekday: 'long' })
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
        <h2 className="dayHead"><i>{dayString}</i></h2>
        <div className="evContainer">
        {daysEvents.map((show, index) => (
          
          show.summary !== 'FREI' ?
                <li className='evDay' key={index}> 
                  <ul className="evTime">{dateToTimeString(show.start)}</ul>  
                  <ul className="evName" > {show.summary}</ul>     
                </li>
                :
                ""
              ))}
          </div>

      </div>
  )
  } 
}

export default Weekday;
