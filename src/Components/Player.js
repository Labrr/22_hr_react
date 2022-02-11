import React, { useState, useEffect } from "react";
import { ReactComponent as PlayIcon } from '../Images/Svg/play.svg'
import { ReactComponent as PauseIcon } from '../Images/Svg/pause.svg'
import PlayLogo from '../Images/Svg/play.svg'
import PauseLogo from '../Images/Svg/pause.svg'
import './Player.css'

// const useAudio = url => {
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



const Player = ({ url }) => {
  const [play, setPlay] = useState(false);
  const [audio] = useState(new Audio(url));

  useEffect(() => {
      play ? audio.play() : audio.pause();
    },
    [play]
  );


  return (
    <div className="audioPlayer">
      <button className="playButton" onClick={() => setPlay(!play)}>
        <img src={play ? PlayLogo : PauseLogo } 
            style={ {height: "13em", width: "13em"} }
        />
      </button>
      <div className="slidercontainer">
       <input type="range" min="1" max="100" value="50" className="slider" id="myRange"></input>
      </div>

    </div>
  );
};

export default Player;