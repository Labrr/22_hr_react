import {useState, useRef, useEffect} from 'react'
import './Nav.css'
import AudioPlayer from './Components/AudioPlayer/AudioPlayer';
import { CSSTransition } from 'react-transition-group';
import useFetchAudioInfo from './Hooks/useFetchAudioInfo'

function NavBar(props){

  const [activeMenu, setActiveMenu] = useState(false)
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  // const [windowDimensions] = useWindowDimensions()

  function menuChange(menuOpen){
    if(activeMenu === menuOpen){
      setActiveMenu(false)
    }else{
      setActiveMenu(menuOpen)
    }
  } 


  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }


  return(
    <div className="menu-container">
   
      <div className='main-menu' >
        
        <AudioPlayer mobile ={props.mobile} wWidth = {windowDimensions.width >= 600 ? true: false} url="https://halloradi0.out.airtime.pro/halloradi0_a" />

        
        <div className="menu-btn">
          <a href='#' className="m-btn"  onClick={() => menuChange('cal')}>
            <i className={ activeMenu === 'cal' ? "sec-col" : "" }>
              Calendar
            </i>
          </a>
      
      
          <a href='#' className="m-btn" onClick={() => menuChange('info')}>
            <i className={ activeMenu === 'info' ? "sec-col" : "" }>
              HALLO:
            </i>
          </a>
         
          <a href='#' className="m-btn" onClick={() => menuChange('chat')}>
            <i className={ activeMenu === 'chat' ? "sec-col" : "" }>
              CHAT
            </i>
          </a>
      
        </div>
      </div>
        {
          activeMenu && 
          <PageMenu wWidth = {windowDimensions.width >= 600 ? true: false}>
            { 
                props[activeMenu]
            }
            </PageMenu>
          
        }
      {/* <CSSTransition
        in={activeMenu === "cal"}
        timeout={1000}
        classNames="dd"
      >
        <div className={ activeMenu === "cal"? 'menu-dd' : ''}>
          { activeMenu === 'cal'  && props.children[0]}
        </div>
      </CSSTransition>
     
      <CSSTransition
        in={activeMenu === "info"}
        timeout={1000}
        classNames="dd"
      >
        <div className={ activeMenu === "info"? 'menu-dd' : ''}>
          { activeMenu === 'info'  && props.children[1]}
        </div>
      </CSSTransition> */}
    </div>

  )
}


function PageMenu({wWidth, children}){
  const nodeRef = useRef(null)

  return(
    <div className="page-container">
      {wWidth ? 
      // <Draggable nodeRef={nodeRef}>
        <div ref={nodeRef} className="pageMenu">
        { 
          children
        }
        </div>
      :
      <div ref={nodeRef} className="pageMenu">
      { 
        children
      }
      </div>    
      }
  </div>
  )
}

export default NavBar