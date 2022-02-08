import React, { useState, useEffect } from "react";
import { ReactComponent as PlayIcon } from '../Images/Svg/play.svg'
import { ReactComponent as PauseIcon } from '../Images/Svg/pause.svg'


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
    <div>
      {/* <button onClick={() => setPlay(!play)}>{play ? "Pause" : "Play"}</button> */}
    </div>
  );
};

export default Player;