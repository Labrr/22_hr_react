import React from 'react'
import Calendar from '../Components/Calendar/Calendar';


export default function Start() {
    const translateCal = () => {
        
    }
        
    return (
        <div className="start-container">
            <h1>Start</h1>
            <Calendar />
            <button onClick={translateCal}>Calendar</button>
        
        </div>
    )
}
