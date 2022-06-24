import { useEffect, useState} from 'react'

const PlayButton = ({url, btnOn}) => {
  const [audioElement, setAudioElement] = useState(new Audio(url))
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let delayedPlay = null;
    console.log(btnOn, "btn")

    if(btnOn){
      setLoading(true)
      audioElement.src = url

      if(audioElement.src !== null){
            audioElement.load();
            console.log(audioElement.currentTime)              
            delayedPlay = setTimeout(() => {
              audioElement.play()
              console.log(audioElement.currentTime)              
            }, 3500);
          }
        }
        if(!btnOn){
          console.log("pause")
          audioElement.pause()
          console.log(audioElement.currentTime)              
          audioElement.src = null;
    } 
    
    return () => {
      if(!btnOn){
        audioElement.pause()
        // setUrlR(null)
        audioElement.src = null;
      } 
      clearTimeout(delayedPlay); 
    }
  }, [btnOn])
 
  return [audioElement, loading ]
}

export default PlayButton