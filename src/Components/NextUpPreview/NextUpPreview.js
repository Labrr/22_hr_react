import { useState, useEffect} from 'react';
import Weekday from '../Weekday/Weekday'
import moment from 'moment'
import './NextUpPreview.css'


export function Preview( {week, day} ){

  const [date] = useState(new Date())
  const [prevDay, setPrevDay] = useState(getNextThuOrToday(date.getDay()))
  const [nextOrCurrShow, setNextOrCurrShow] = useState(false)


  useEffect(() => {
    if(week.length > 0){
      setNextOrCurrShow(getNextShowOrCurrent(date.getDay()))
      console.log(nextOrCurrShow)
    }
  
 
  }, [week])
  

  function getNextThuOrToday(today) {
    if(today > 3 || today === 0){
      return today;
    }else{
      return 4;
    }
  }

  function getNextShowOrCurrent(today){
    const nextDay = week[prevDay];
    
    var show = nextDay[0];
    if(today < 3){
      return show;
    }else{
      nextDay.forEach(daysEvent => {
        let startTimeShow = moment(daysEvent.start)
        let endTimeShow = moment(daysEvent.end)

        // console.log(startTimeShow.getHours() + " == " + today.getHours() )
        // if(startTimeShow.getHours() === 16){
        //   show = daysEvent;
        // console.log(moment(new Date()));
        if(moment(new Date()).isBetween(startTimeShow, endTimeShow)){
          show = daysEvent
        }
          // console.log(startTimeShow - endTimeShow)
        // } 
    });

    return show;  
  }
  }

  return(
    <div className="preview">
      <DdPreview rest={<Weekday daysEvents={week[prevDay]} day={prevDay} />} />
        
      <div>{nextOrCurrShow ? nextOrCurrShow.summary : "loading"}</div>
          
    </div>
  )
} 

function DdPreview({rest}){
  const [ open, setOpen ] = useState(false);

  return(
    <div onClick={ () => setOpen(!open)} className="dpreview" >
      <h1 >Nextup</h1>
      {open && rest}
    
    </div>
  )
}

