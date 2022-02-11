import React from 'react'

const AudioPlayer = ({ url }) => {

    const audioElement = new Audio(url);
    const [isPlaying, setIsPlaying] = useState(false);
    
    

    return (
        <div className="audio-player">
            <h1>Button</h1>
        </div>
    )
}

export default AudioPlayer 