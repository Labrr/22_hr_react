import React from 'react'

const AudioPlayer = ({ url }) => {

    const audioElement = new Audio(url);
    const [isPlaying, setIsPlaying] = useState(false);
    
    

    return (
        <div>
            
        </div>
    )
}

export default AudioPlayer 