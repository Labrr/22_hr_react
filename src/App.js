import './App.css'
import { useState } from 'react';
import { BackgroundVisual } from './Components/BackgroundVisual/BackgroundVisual';
import { Preview } from './Components/NextUpPreview/NextUpPreview';
import Home from './Routes/Home'
import Chat from './Components/Chat/Chat'
import Calendar from './Components/Calendar/Calendar';
import NavBar from './Nav';
import useWindowDimensions from './Hooks/useWindowDimensions';
import useCalendarDates from './Hooks/useCalendarDates';
import Modal_popup from './Pages/Modal_popup';

function App() {
  const [windowDimensions] = useWindowDimensions([])
  const [mobile] = useState(windowDimensions.width <= 600)
  const [weekEvents, isLoaded, error] = useCalendarDates([]);
  // const [bg3d, setbg3d] = useState(false);



  return (
    <>
      <div className="App">

      <Modal_popup/>
    
        <NavBar
          mobile={mobile}
          cal={<Calendar active={true} week={isLoaded ?  weekEvents : false} error={error} />}      
          info={<Home name="info"/>}
          chat={<Chat mobile={mobile} />}        
        />
          <Preview week={isLoaded ?  weekEvents : false}/> 
      </div>  
    
      {/* <button className="button-bg" onClick={ console.log("h")}>Click</button> */}

      <div className="bg-app">
      { 
        mobile ?
        <div className="mobileBG" />
        :
        <BackgroundVisual week={isLoaded ?  weekEvents : false}/> 
      }
      </div>
      </>     
 );
}

export default App;
