import React, { useContext, useEffect, useState } from "react";
import AudioTrackControls from "./AudioTrackControls";
import AudioTracksContext from "../contexts/AudioTracksContext";

export default function AudioTrack ({ sample }) {
  const {tracks, setTracks} = useContext(AudioTracksContext)
  
  useEffect(() => {
    console.log('[AudioTrack].[useEffect]')
    console.log('sample value: ')
    console.log(sample)
    
    const tracksArray = tracks;
    
    if(tracksArray.find(value => value.id === sample.name) === undefined){
      const newRowToContext = { id: sample.name, states: sample.soundStates }
      tracksArray.push(newRowToContext)
      setTracks(tracksArray)
    }
    
  }, []);


    return (
        <>  
            <div className='channelContainer'>
              <div className='channelControls'>
                <AudioTrackControls sample={sample}/>
              </div>
              <div className='channelSprites' style={{ width: '100%' }}>
                <div className='spritesContainer' style={{ width: '50%' }}>
                  <div id={sample.name} />
                </div>
              </div>
            </div>        
        </>
        )
}
