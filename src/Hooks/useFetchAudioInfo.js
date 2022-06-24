import React, { useState, useEffect } from 'react'
import axios from "axios";
import moment from 'moment'


export default function useFetchAudioInfo() {
    const [loading, setLoading] = useState(true)
    const [rightNow, setRightNow] = useState(false)
    const [nextShow, setNextShow] = useState('loading')
    const [now, setNow] = useState(moment())

useEffect(() => {
    const controller = new AbortController();
    let isApiSubscribed = true;
    

    if(isApiSubscribed){     
        setLoading(true)
        axios.get(`https://api.lasseborntraeger.de/calendarnext/${new Date()}`, {
            signal: controller.signal 
        })
        .then((res) => {
            if(res.data.length > 0){
                let nextShow = res.data.filter(freiOrShow)
                
                if(now.isBetween(moment(nextShow[0].start), moment(nextShow[0].end))){
                    setRightNow(true)
                }else{
                    // setRightNow(true)
                    setRightNow(false)
                }
                setNextShow(nextShow[0])
            }
            setLoading(false)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    return () => {
        controller.abort()
        isApiSubscribed = false;
    }
}, [])



const freiOrShow = (shows) => {
    let day = new Date(shows.start).getDay()
    return shows.summary !== 'FREI' && (day >= 1 || day === 0)
}

  return [nextShow, rightNow, loading]
}
