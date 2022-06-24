import { useState, useEffect } from "react";
import './AudioPlayer.css'
import Marquee from 'react-fast-marquee'
import PlayButton from "./PlayButton";
import useFetchAudioInfo from "../../Hooks/useFetchAudioInfo";
import useFetchLive from "../../Hooks/useFetchLive";

export const AudioBanner = ({mobile}) => {
  const [nextShow, isNow] = useFetchAudioInfo(null);
  const [live, loading] = useFetchLive();
  const [banner, setBanner] = useState('loading')
 
useEffect(() => {
  setBanner(loadBannerContent())
  return () => {
  }
}, [nextShow])


  const loadBannerContent = () => {
    if(loading){
      return "loading"
    }else if(!live) { 
      return " NOT ON AIR " 
    }else{
      if(isNow){
        return " " + nextShow.summary + " "
      }else{
        return " ON AIR "
      }
    }
}

  let plus = "+++"

  return(
    banner !== "loading" ?
    <Marquee  
          className="marqueeInfo"
          pauseOnHover={!live}
          play={live}
          gradient={true}
          gradientWidth={20}
          gradientColor={[148, 58, 162]}
        >

         <i>  
           
           {
              plus + banner + plus + banner + plus + banner + plus + banner+ plus + banner + plus + banner
           }  
          </i>
      
        </Marquee> 
        :
        <Marquee
           className="marqueeInfo"
        >
         {
           banner
         } 
        </Marquee>
  )
}



const AudioPlayer = ({mobile, url}) => {
  const [audioPlay, setAudioPlay] = useState(false);
  // const [audioElement, loading] = usePlayButton({audioPlay, url})

  return (
    <div className={audioPlay ? "audio-container audioOpen" : "audio-container"}>
    
      <div className="audioPlayer">
        <div className="playButton" onClick={() => setAudioPlay(!audioPlay)} >

          <div className={audioPlay ?  "pause" : "play"} />

            {<PlayButton url={url} btnOn={audioPlay} />}
          </div>
      
      </div>
     

     {
        mobile ? 
        <div className="playInfo show" >
          <AudioBanner mobile={mobile} />
      </div>
      :
      audioPlay &&
        <div className={audioPlay? "playInfo show" : "playInfo "}>
          <AudioBanner mobile={mobile} />
      </div>
     }
     
    </div>
  );
};

export default AudioPlayer;
