import Weekday from '../Weekday/Weekday'
import './NextUpPreview.css'

export function NextUpPreview( {week, day} ){
    let date = new Date();
    let today = date.getDay();
    
    console.log(week)
    return(
      <div className="nextup">
        <Weekday daysEvents={week[today]} day={today} />
      </div>
    )
  }