import React, { useContext, useEffect, useState } from "react";
import AudioTrackControls from "./AudioTrackControls";
import ProjectContext from "../contexts/ProjectContext"
import { useAudioContext } from "../contexts/ProjectContext"

export default function AudioTrack ({ sample }) {
  const { dataContext, updateContext } = useContext(ProjectContext);
  const audioContext = useAudioContext();
  const [audioElement, setAudioElement] = useState(null);
  const [sourceAudio, setSourceAudio] = useState(null);

  useEffect(() => {
    //const audioFile = `../samples/${sample.name}.mp3`;
    //loadAudioFromFile(audioFile)
  }, []);

    return (
        <>  
            <div className='channelContainer'>
                <div className='channelControls'>
                <AudioTrackControls sample={sample} audioElement={audioElement}/>
                </div>
                <div className='channelSprites' style={{
                    width: '100%'
                    }}>
                    <div className='spritesContainer'>
                    <div id={sample.name}></div>
                    </div>
                </div>    
            </div>        
        </>
        )
}
