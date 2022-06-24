import React from 'react';
import useAudio from './useAudio';

const Player = () => {
  const { element, state, controls } = useAudio({
    src:
      'https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_2MG.mp3',
  });

  return (
    <div>
      {element}
      <button onClick={() => controls.seek(state.time - 10)}>-10 sec</button>
      <button
        onClick={() => {
          state.paused ? controls.play() : controls.pause();
        }}
      >
        {state.paused ? 'play' : 'pause'}
      </button>
      <button onClick={() => controls.seek(state.time + 10)}>+10 sec</button>
      <br />
      {Math.round(state.time)} / {Math.round(state.duration)}
      <br />
      Playback Speed (100 = 1)
      <br />
      <input
        onChange={e => controls.setPlaybackRate(e.target.value / 100)}
        type="number"
        value={state.playbackRate * 100}
      />
    </div>
  );
};