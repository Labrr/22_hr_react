import { useState, useEffect } from "react";
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
    
    play ?  audio.play()
    : audio.pause();

  }
  
  function handleVolChange(e){
    setVol(e.target.value)
    audio.volume = vol/100;
  }


  function getAudioStream(){
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
          <div className={play ?  "pause" : "play"} />
      </div>
      

       <div className={play ? "sliderContainer show" : "sliderContainer"}>
      {/* <div className="sliderMove"> */}

       
            <input type="range" min="0" max="100" value={vol} onChange={handleVolChange}  className="volumeSlider" id="volume"></input>
          </div>
       </div>

    // </div>
  );
};

export default AudioPlayer;