import { useState, useEffect} from 'react';
import Weekday from '../Weekday/Weekday'
import moment from 'moment'
import './NextUpPreview.css'
import useFetchAudioInfo from '../../Hooks/useFetchAudioInfo';
import useFetchLive from '../../Hooks/useFetchLive';

export function Preview( {week, day} ){

  const [date] = useState(new Date())
  const [prevDay, setPrevDay] = useState(getNextThuOrToday(date.getDay()))
  const [nextOrCurrShow, setNextOrCurrShow] = useState(false)
  const [ open, setOpen ] = useState(false);
  const [nextShow, nowPlaying, loading] = useFetchAudioInfo(open);
  

  useEffect(() => {
    if(week.length > 0){
      setNextOrCurrShow(getNextShowOrCurrent(date.getDay()))
    }
    if(open){
      console.log("open")

    }

  }, [week, open])
  
  

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

      nextDay.forEach(daysEvent => {
        if(show.summary === 'FREI') { show = daysEvent } 
        let startTimeShow = moment(daysEvent.start)
        let endTimeShow = moment(daysEvent.end)
              
        let now = moment(new Date());
        if(now.isBetween(startTimeShow, endTimeShow)){
          show = daysEvent
        }

    });
    return show;  
  
  }
  
  function dateToTimeString(evStart){
    let tmp_d = new Date(evStart);
    let mins = ('0'+tmp_d.getMinutes()).slice(-2);
    let h = ('0'+tmp_d.getHours()).slice(-2);
    return h + "" + mins;
  }

  
  return(
  
    <div className="preview" onClick={ () => setOpen(!open)}>

      <DdPreview playing={nowPlaying} open={open} rest={<Weekday daysEvents={week[prevDay]}  day={prevDay} />} />
      
      


      {!open ?  
        <div className='previewAct'> <i>
                
                {!loading ? 
                <span> 
                    <strong className="prevTime">
                      {dateToTimeString(nextShow.start)}
                    </strong>
                    <i>
                      {nextShow.summary}
                    </i>
                  </span>
                :
                <span>loading...</span>  
              }
                </i>
                </div>
      :
     <></>

      }
      </div>
)
} 

function DdPreview({rest, open}){
  const [live] = useFetchLive()
  const [headerOpen, setHeaderOpen] = useState("NEXT UP")
  const [today] = useState(new Date())


  const checkDay = () => {
    if(rest.props.day === today.getDay()){
      setHeaderOpen("TODAY")
    }else{
      setHeaderOpen("NEXT UP")
    }
  }

  useEffect(() => {
    checkDay()      
  }, [])
  


  return(
    <div  className="dpreview" >

          <h1 className= {open ? "sec-col" : ""}>
            <i> 
          {
                open ? headerOpen : "NEXT UP"
          }
          </i>
             
          </h1>
      {open && rest}
    </div>
  )
}

