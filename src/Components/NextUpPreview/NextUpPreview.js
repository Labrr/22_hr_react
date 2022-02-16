import { useState, useEffect } from 'react/cjs/react.development';
import Weekday from '../Weekday/Weekday'
import './NextUpPreview.css'


export function Preview( {week, day} ){
  const [date] = useState(new Date())
  const [prevDay, setPrevDay] = useState(getNextThuOrToday(date.getDay()))


  function getNextThuOrToday(today) {
    if(today > 3 || today === 0){
      return today;
    }else{
      return 4;
    }
  }

  return(
    <div className="preview">
      <Weekday daysEvents={week[prevDay]} day={prevDay} />
    </div>
  )
} 