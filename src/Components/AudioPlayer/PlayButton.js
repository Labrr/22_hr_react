import {useRef, useEffect} from 'react'

const PlayButton = ({url, btnOn, vol}) => {

  const audioRef = useRef();

  useEffect(() => {
    let delayedPlay = null;

    if(btnOn){
      audioRef.current.src = url

      if(audioRef.current.src !== null){
        audioRef.current.load();
            delayedPlay = setTimeout(() => {
              audioRef.current.play()
            }, 3500);
          }
        }
        if(!btnOn){
          console.log("pause")
          audioRef.current.pause()
          audioRef.current.src = null;
    } 
    
    return () => {
      if(!btnOn){
        audioRef.current.pause()
        audioRef.current.src = null;
      } 
      clearTimeout(delayedPlay); 
    }
  }, [btnOn])
 

  return(
    <>
      {btnOn ?
       <audio 
        preload="auto"
        src={url}
        volume={vol}
        ref={audioRef}
      ></audio>
      :
      <audio ref={audioRef} />
      }
    </>
  )
}

export default PlayButton