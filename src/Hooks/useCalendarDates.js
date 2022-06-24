import { useState, useEffect } from 'react';
import moment from 'moment'
import axios from 'axios';


export default function useCalendarDates() {
    
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [weekEvents, setWeekEvents] = useState([])


    useEffect(() => {
        let isApiSubscribed = true;
        if(isApiSubscribed){ 
          var startOfWeek = moment().startOf('isoWeek').toDate();
          var endOfWeek   = moment().endOf('isoWeek').toDate();
          
          getEvents(
            startOfWeek,
            endOfWeek
            ); 
          }
          //cleanup
          return () => {
            // cancel the subscription
            isApiSubscribed = false;
        };
      }, []);


  function getEvents(start, end) {
    axios.get(`https://api.lasseborntraeger.de/calendar/${ start} / ${ end }`)
    .then(function (response) {
      // handle success
      const weekDataRaw = response.data;
      setWeekEvents(sortByDay(weekDataRaw))
      setIsLoaded(true);
     })
    .catch(function (err) {
      setError(err) 
      setIsLoaded(false)
      return -1;
    })
  }
  
  function filterDay(week, day) {
    var eventsThatDay = week.filter(function (el) {    
      let parseDayDate = new Date(el.start)
        return parseDayDate.getDay() === day
    });
    return eventsThatDay;
  }
  
  function sortByDay(weekRawData) {        
    const week = [];

    for (let iday = 0; iday < 7; iday++) {
      const day = filterDay(weekRawData, iday);
      week[iday] = day;
    }    
    return week;
  }


  return [weekEvents, isLoaded, error]
}
