import React, {useState, useEffect } from 'react'
import Weekday from '../Weekday/Weekday';
import  './Calendar.css';


export default function Calendar( { week, error } ) {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if(week && week.length > 0){
      setLoading(true)      
    }
      
    return () => {
    };
  }, [week]);
  

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!loading) {
    return <div>Loading...</div>;
  } else {
     
    return(
      <div className="cal-container">
        <div className="calendar">
            {doit(week)}
          </div>
      </div>
    );
  }
}

function doit(week) {
  const weekComp = [];
  for (let i = 0; i < week.length; i++) {
      const daysEvents = week[i];
      if(daysEvents.length <= 0 && i <= 3){
        weekComp.push(<Weekday key={i} daysEvents={daysEvents} day={7} />)
      }else{
        weekComp.push(<Weekday key={i} daysEvents={daysEvents} day={i} />)
      }
    }
    console.log(weekComp)
    return weekComp;
}


