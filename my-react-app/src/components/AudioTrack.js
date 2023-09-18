import React, { useContext, useEffect, useState } from "react";
import AudioTrackControls from "./AudioTrackControls";

export default function AudioTrack ({ sample, handleChannelStatesOnSolo, handleChannelStatesOnMute, states }) {

  const [channelState, setChannelsState] = useState({solo: false, muted: false, rec: false})

  useEffect(() => {
    console.log('[AudioTrack].[useEffect]')
    console.log('sample value: ')
    console.log(sample)
    console.log('sample.waveform value: ')
    console.log(sample.waveform)

    console.log('states value: ')
    console.log(channelState)
    setChannelsState(states)
  }, [channelState]);

  const onClickMute = () => {
    handleChannelStatesOnMute(sample)
  }

  const onClickSolo = () => {
    handleChannelStatesOnSolo(sample)
  }

  const onChangeChannelStates = () => {
    setChannelsState(states)
  }
  
  return (
          <>  
            <div className='channelContainer'>
              <div className='channelControls'>
                <AudioTrackControls 
                  sample={sample} 
                  onClickMute={onClickMute} 
                  onClickSolo={onClickSolo}
                  states={channelState}
                  onChangeChannelStates={onChangeChannelStates}
                  />
                  
              </div>
              <div className='channelSprites' style={{ width: '100%' }}>
                <div className='spritesContainer' style={{ width: '50%' }}>
                  <div 
                  ref={sample.containerRef}
                  ></div>
                </div>
              </div>
            </div>        
          </>
        )
}
