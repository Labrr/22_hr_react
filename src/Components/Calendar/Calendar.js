import React, {useState, useEffect } from 'react'
import Weekday from '../Weekday/Weekday';
import  './Calendar.css';

export default function Calendar( { isLoaded, error, items} ) {
  

  const [mon, setMon] = useState("")

  useEffect(() => {
    if(isLoaded){
      
     
      setMon()
      console.log(filterDay(items, 6))
    }
    
    return () => {
    };
  }, [items]);
  




  function filterDay(week, day) {
    var eventsThatDay = week.filter(function (el) {
      
      let parseDayDate = new Date(el.start.dateTime)
  
      console.log(parseDayDate.getDay() + " = " + day);
      return parseDayDate.getDay() == day
    });
    console.log(eventsThatDay);
    return eventsThatDay;
    // const thu = items.filter()
  }
  


  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {

    return(
      <div className="cal-container">
        <div className="calendar">
          <ul>
            {items.map(item => (
              <li key={item.id}> 
                <Weekday day_timestr= {item.start} />

                {item.start.dateTime} {item.summary}     
              </li>
            ))}
          </ul>
          </div>
      </div>
    );
  }
}
