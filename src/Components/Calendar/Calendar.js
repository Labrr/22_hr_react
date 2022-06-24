import {useState, useEffect } from 'react'
import Weekday from '../Weekday/Weekday';
import  './Calendar.css';
import moment from 'moment'

export default function Calendar( { week, error } ) {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if(week && week.length > 0){
      setLoading(true)      
    }    
    return () => {
    };
  }, [week]);
  
  const getCurrDate = () => {
    let thu = moment().isoWeekday(4)
    let sun = moment().isoWeekday(7)
    return `${thu.date()}.-${sun.date()}.${sun.month()} ` 
  }

  console.log(
    getCurrDate()
  )

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!loading) {
    return <div>Loading...</div>;
  } else {
     
    return(
      
      <div className="cal-container">
          <div className='date'>{getCurrDate()}</div>
          <div className="calendar">
              {sortWeek(week)}
          </div>
      </div>
    );
  }
}

function sortWeek(week) {
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


