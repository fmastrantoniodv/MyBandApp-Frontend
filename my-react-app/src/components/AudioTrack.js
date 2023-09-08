import React, { useContext, useEffect, useState } from "react";
import AudioTrackControls from "./AudioTrackControls";

export default function AudioTrack ({ sample }) {
  const [soloState, setSoloState] = useState(false)
  
  useEffect(() => {
    console.log('[AudioTrack].[useEffect]')
    console.log(sample)
    
    if(sample !== undefined){
      setSoloState(sample.soundStates.solo)
    }
    
  }, []);


    return (
        <>  
            <div className='channelContainer'>
              <div className='channelControls'>
                <AudioTrackControls sample={sample} soloState={soloState}/>
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
