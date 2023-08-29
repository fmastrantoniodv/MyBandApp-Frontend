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

  const loadAudioFromFile = (fileURL) => {
    const audio = new Audio(fileURL);
    setAudioElement(audio);
    createAudioContext(audio);
  };

  const createAudioContext = (audio) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaElementSource(audio);
    setSourceAudio(source)
    // Use the 'source' node in your audio processing here
  };


  //console.log(sourceAudio)

    /*
    console.log('AudioTrack sample:')
    console.log(sample.name)
    const { dataContext, updateContext } = useContext(ProjectContext);
    const [audioComponent, setAudioComponent] = useState(null)
    
    const audioCtx = useAudioContext()

    console.log(audioCtx)

    useEffect(() => {
      const audioFile = `../samples/${sample.name}.mp3`;
      console.log(audioFile)

      const fetchAudioData = async () => {
        const response = await fetch(audioFile);
        
        const decodedData = await dataContext.audioContext.decodeAudioData(await response.arrayBuffer());
  
        const source = dataContext.audioContext.createBufferSource();
        source.buffer = decodedData;
        source.connect(dataContext.audioContext.destination);
      };

      fetchAudioData();
    }, [sample]);
    */

    return (
        <>  
            <div className='channelContainer'>
                <div className='channelControls'>
                <AudioTrackControls sample={sample} audioElement={audioElement}/>
                </div>
                <div className='channelSprites' style={{
                    width: '100%'}}>
                    <div className='spritesContainer'>
                    <div id={sample.name}></div>
                    </div>
                </div>    
            </div>        
        </>
        )
}
