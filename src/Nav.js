import {useState, useRef, useEffect} from 'react'
import './Nav.css'
import AudioPlayer from './Components/AudioPlayer/AudioPlayer';
import { CSSTransition } from 'react-transition-group';


function NavBar(props){


  function NavItem(props) {
    
    return(
      <a href="#" className='menuItem' onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>

        <span className='menubtn'>{props.name}</span>
        {props.children}
      
      </a>  
    ) 
  }
  
  const [openA, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(false)


  function menuChange(menuOpen){
    if(activeMenu === menuOpen){
      setActiveMenu(false)
    }else{
      setActiveMenu(menuOpen)
    }
  } 


  return(
    <div className="menu-container">
   
      <div className='main-menu' >
        
        <AudioPlayer />
        <div className="menu-btn">
          <a href='#' className="m-btn"  onClick={() => menuChange('cal')}>
            <i className={ activeMenu === 'cal' ? "text-sec-col" : "" }>
              Calendar
            </i>
          </a>
          <a href='#' className="m-btn" onClick={() => menuChange('info')}>
            <i>
              HALLO:
            </i>
          </a>
        </div>
      </div>
      
     
      

      <CSSTransition
        in={activeMenu === "cal"}
        timeout={1000}
        classNames="dd"
      >
        <div className={ activeMenu === "cal"? 'menu-dd' : 'menu-dd '}>
          { activeMenu === 'cal'  && props.children[0]}
        </div>
      </CSSTransition>
     
      <CSSTransition
        in={activeMenu === "info"}
        timeout={1000}
        classNames="dd"
        >
        <div className={ activeMenu === "info"? 'menu-dd' : 'menu-dd '}>
          { activeMenu === 'info'  && props.children[1]}
        </div>
      </CSSTransition>

    </div>



  //   <div className="dropdown" style={{ height: menuHeight }} ref={propRef}>
      
  //           <button type="button" onClick={() => setInProp(!inProp)}>
  //             Click to Enter
  //           </button>

  // <div>
  //       <CSSTransition in={inProp} timeout={1200} classNames="my-node" >
  //       <div>
  //          { inProp && props.children }
  //       </div>
  //     </CSSTransition>
  //   </div>      

 
  //     </div>
  )
}



// function NavBar(props){
//   const [open, setOpen] = useState(false)
//   const [activeMenu, setActiveMenu] = useState("main")

//   return(
//     <div className='navContainer'>
//     <div className='mainNav'>

//       <div className='menuBtn'>
//         <a href='#' onClick={() => setOpen(!open)}>
//           <div>Calendar</div>
//         </a>
//       </div>
//     </div>
            
//       <div className="menuContent">
//         {open && props.children}
//       </div>
    
//     </div>
//     )
// }

export default NavBar