import { useEffect, useState} from 'react';
import axios from 'axios';

const useFetchLive = () => {
  const [loading, setLoading] = useState(false);
  const [live, setLive] = useState(false)

  useEffect(() => {
    let controller = new AbortController();
    setLoading(true)
    axios.get("https://halloradi0.airtime.pro/api/live-info", {
        signal: controller.signal 
    }) 
    .then(function (response) {
      setLive(response.data.current !== null)
      setLoading(false)  
    })
    .catch(function (err) {
        console.log("error", err)
    })
      
    return () => {
      controller.abort()
    }
  }, []);

  return [
    live,
    loading,
  ];
};


export default useFetchLive;
