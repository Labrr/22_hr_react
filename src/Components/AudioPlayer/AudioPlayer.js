import React, { useState, useEffect } from "react";
// import { ReactComponent as PlayIcon } from '../Images/Svg/play.svg'
// import { ReactComponent as PauseIcon } from '../Images/Svg/pause.svg'
// import PlayLogo from '../Images/Svg/play.svg'
// import PauseLogo from '../Images/Svg/pause.svg'
import './AudioPlayer.css'
import axios from "axios";
//   const [audio] = useState(new Audio(url));
//   const [playing, setPlaying] = useState(false);

//   const toggle = () => setPlaying(!playing);


  
//   useEffect(() => {
//       playing ? audio.play() : audio.pause();
//     },
//     [playing]
//   );

//   useEffect(() => {
//     audio.addEventListener('ended', () => setPlaying(false));
//     return () => {
//       audio.removeEventListener('ended', () => setPlaying(false));
//     };
//   }, []);

//   return [playing, toggle];
// };



const AudioPlayer = ({ url }) => {
  const [play, setPlay] = useState(false);
  const [audio] = useState(new Audio(url));
  const [vol, setVol] = useState(100)
  
  

  useEffect(() => {
    handleAudioToggle();
    
      console.log(audio.volume)
      // getAudioStream();
      return () => {
        // setPlay(false)
    }
    },
    [play]
  );
  
  function handleAudioToggle(){
    play ? audio.load() && audio.play() : audio.pause();

  }
  
  function handleVolChange(e){
    setVol(e.target.value)
    audio.volume = vol/100;
  }


  function getAudioStream(){
    console.log("gogostrea,m")
    axios.get(url)
    .then(function (response) {
      // handle success
      console.log(response)
     
    })
    .catch(function (err) {
      console.log("error", err)
    })

  }

  return (
    <div className="audioPlayer">
      <div className="playButton" onClick={() => setPlay(!play)}>
          <div className={play ? "play" : "pause"} />
      </div>
      

       <div className={play ? "sliderContainer" : "sliderContainer show"}>
      {/* <div className="sliderMove"> */}

       
            <input type="range" min="0" max="100" value={vol} onChange={handleVolChange}  className="volumeSlider" id="volume"></input>
          </div>
       </div>

    // </div>
  );
};

export default AudioPlayer;