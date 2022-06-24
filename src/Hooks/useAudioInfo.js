import React, { useState, useEffect } from 'react'
import axios from "axios";
import moment from 'moment'


export default function useAudioInfo() {
    const [loading, setLoading] = useState(true)
    const [isLive, setIsLive] = useState(false)
    const [rightNow, setRightNow] = useState(false)
    const [nextShow, setNextShow] = useState('loading')

useEffect(() => {
    const controller = new AbortController();
    let isApiSubscribed = true;
    if(isApiSubscribed){ 
        
        const fetchPromise = fetch("https://halloradi0.airtime.pro/api/live-info");
        fetchPromise.then(res => {
            console.log(res)
        })

        axios.get("https://halloradi0.airtime.pro/api/live-info", {
            signal: controller.signal 
        }) 
        .then(function (response) {
            response.data.currentShow.length > 0  ? setIsLive(true) : setIsLive(false)
        })
        .catch(function (err) {
            console.log("error", err)
        })
        
        axios.get(`http://localhost:5001/calendarnext/${new Date()}`, {
            signal: controller.signal 
        })
        .then((res) => {
            if(res.data.length > 0){
                let nextShow = res.data.filter(freiOrShow)
                let now = moment();

                if(now.isBetween(nextShow[0].start, nextShow[0].end)){
                    setRightNow(true)
                }else{
                    setRightNow(false)
                    setRightNow(true)
                }
                setNextShow(nextShow[0])
            }
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



const fetchCalArtist = () => {
    axios.get(`http://localhost:5001/calendarnext/${new Date()}`)
        .then((res) => {
            if(res.data.length > 0){
                let nextShow = res.data.filter(freiOrShow)
                let now = moment();

                if(now.isBetween(nextShow[0].start, nextShow[0].end)){
                    setRightNow(true)
                }else{
                    setRightNow(false)
                    setRightNow(true)
                }
                setNextShow(nextShow[0])
            }
        })
        .catch((err) => {
            console.log(err)
        })
}

const freiOrShow = (shows) => {
    let day = new Date(shows.start).getDay()
    return shows.summary !== 'FREI' && (day >= 1 || day === 0)
}

  return [nextShow, rightNow ,isLive]
}
