import React, { useState } from 'react'
import "./Modal_popup.css";
import  hallo_img from "./hallofest_22.webp"


export default function Modal_popup() {
   const [modal, setModal] = useState(true);

   function timeout(res,delay) {
     return new Promise( res => setTimeout(res, delay) );
   }

   return (
    <div className= {modal ? "modal_wrapper" : "modal_wrapper hide"} > 
        <img onClick={()=> setModal(!modal)} className={ modal ? "modal_img" : "modal_img op_out"}  src={hallo_img}/>
    </div>
  )
}   
