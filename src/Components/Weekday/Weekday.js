import React, { useEffect, useState } from 'react';

function Weekday({ day_timestr }) {
  
  // const [day, setday] = useState('');

  const day_format = (time_string) => {
    let day_string = new Date(time_string.dateTime)
    .toLocaleDateString('en-EN', { weekday: 'long' })
    return day_string;
  }
  
  // console.log(day_format(day_timestr));


    return(
      <div className={"day " + day_format(day_timestr)}>
        <h2>{day_format(day_timestr)}</h2>
      </div>
  ) 
}

export default Weekday;
