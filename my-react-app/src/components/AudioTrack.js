import React, { useContext, useEffect, useState } from "react";
import AudioTrackControls from "./AudioTrackControls";
import ProjectContext from "../contexts/ProjectContext"
import { useAudioContext } from "../contexts/ProjectContext"

export default function AudioTrack ({ sample }) {
  const { dataContext, updateContext } = useContext(ProjectContext);
  const audioContext = useAudioContext();
  const [audioElement, setAudioElement] = useState(null);
  const [sourceAudio, setSourceAudio] = useState(null);
  var anchoVentana = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  var audioSpritesWith = anchoVentana - 400;
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
                    <div className='spritesContainer'
                    style={{
                      width: '50%'
                    }}
                    >
                    <div id={sample.name}
                    style={{
                     // width: '900px'
                    }}
                    ></div>
                    </div>
                </div>    
            </div>        
        </>
        )
}
