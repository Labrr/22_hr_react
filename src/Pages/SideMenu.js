import React, {useState} from 'react';
import './SideMenu.css'
import Calendar from '../Components/Calendar/Calendar';
import Player from '../Components/Player';
import { NextUpPreview } from '../Components/NextUpPreview/NextUpPreview';

function Calendar_(props) { 
  const [ open, setOpen ] = useState(true);

  return(
    <div>
      <a href='#' className='calendar-btn' onClick={() => setOpen(!open)}>
      </a>
      { open && props.children }
    </div>
  ) 
}

function SideMenu({children, isLoaded, weekEvents, error}) {
  
  const [ open, setOpen ] = useState(false);


  return(
    <div className={open ? `SideMenu calVis` : `SideMenu` } >    
      <div className="play">
          <Player url="https://halloradi0.out.airtime.pro/halloradi0_a"/>
        </div>
        {children}
        
        <div className="halloContainer">
          <div>
            <h1>HALLO:Radio</h1>
          </div>

          <div className="calendarButton" onClick={() => setOpen(!open)}>
            <div className={open ? `arrowContainer turnaround` : `arrowContainer` }>
              <div className="arrow" />
            </div>
          </div>
        </div>
        
        <NextUpPreview week={isLoaded ?  weekEvents : false}/>
      

        <Calendar week={true ?  weekEvents : false} error={error} />
    </div>
  )  
}

export default SideMenu;
