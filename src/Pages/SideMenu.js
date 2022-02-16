import React, {useState} from 'react';
import './SideMenu.css'
import Calendar from '../Components/Calendar/Calendar';
import AudioPlayer from '../Components/AudioPlayer/AudioPlayer';
// import { NextUpPreview } from '../Components/NextUpPreview/NextUpPreview';


function SideMenu({children, isLoaded, weekEvents, error}) {
  
  const [ open, setOpen ] = useState(false);


  return(
    <div className={open ? `SideMenu calVis` : `SideMenu` } >    
      <div className="play">
          {/* <Player url="https://halloradi0.out.airtime.pro/halloradi0_a"/> */}
          {/* <Player url="https://soundcloud.com/suteropace/bugcity"/> */}
   

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
        
        {/* <NextUpPreview week={isLoaded ?  weekEvents : false}/> */}
      

        <Calendar week={isLoaded ?  weekEvents : false} error={error} />
    </div>
  )  
}

export default SideMenu;
