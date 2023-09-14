import React, { useContext, useEffect, useState } from "react";
import AudioTrackControls from "./AudioTrackControls";

export default function AudioTrack ({ sample, handleChannelStatesOnSolo, handleChannelStatesOnMute, states }) {
  const [muteState, setMuteState] = useState(false)
  const [soloState, setSoloState] = useState(false)
  const [recState, setRecState] = useState(false)

  useEffect(() => {
    console.log('[AudioTrack].[useEffect]')
    console.log('sample value: ')
    console.log(sample)
    console.log('states value: ')
    console.log(states)
    updatedStates(states)
  }, [states]);

  const onClickMute = () => {
    handleChannelStatesOnMute(sample)
  }

  const updatedStates = () => {
    setMuteState()
    setSoloState()
    setRecState()
  }

  const onClickSolo = () => {
    handleChannelStatesOnSolo(sample)
  }

  return (
          <>  
            <div className='channelContainer'>
              <div className='channelControls'>
                <AudioTrackControls 
                  sample={sample} 
                  onClickMute={onClickMute} 
                  onClickSolo={onClickSolo}
                  /*
                  btnMuteState={states.find(value => value.id === sample.name)}
                  btnSoloState={states.find(value => value.id === sample.name)}
                  btnRecState={states.find(value => value.id === sample.name)}
                  */
                  />
              </div>
              <div className='channelSprites' style={{ width: '100%' }}>
                <div className='spritesContainer' style={{ width: '50%' }}>
                  <div 
                  ref={sample.containerRef}
                  //id={sample.name}
                  ></div>
                </div>
              </div>
            </div>        
          </>
        )
}
