import React, { useRef, useContext, useEffect, useState } from "react";
import AudioTrackControls from "./AudioTrackControls";
import useWaveform from "../hooks/useWaveform";

const PUBLICROOT = 'http://127.0.0.1:8080/'

export default function AudioTrack ({ sample, handleChannelStatesOnSolo, handleChannelStatesOnMute, states }) {
  const [channelState, setChannelsState] = useState({solo: false, muted: false, rec: false})
  const [sampleComponent, setSampleComponent] = useState(null)
  const containerRef = useRef()
  
  //HARDCODE PARA QUE TOME LAS URL LOCALES
  const localAudioSrc = PUBLICROOT+'samples/'+sample.id+".mp3";
  const waveformPlayer = useWaveform(localAudioSrc, sample.id, containerRef)
  
  useEffect(() => {
    console.log('[AudioTrack].[useEffect].sample',sample)
    
    if (!waveformPlayer) return

    setSampleComponent(waveformPlayer)
    console.log(waveformPlayer)

  }, [waveformPlayer, states]);


  const onClickMute = () => {
    handleChannelStatesOnMute(sampleComponent)
  }

  const onClickSolo = () => {
    handleChannelStatesOnSolo(sampleComponent)
  }

  const onChangeChannelStates = () => {
    setChannelsState(sampleComponent)
  }

  return (
          <>  
            <div className='channelContainer'>
              <div className='channelControls'>
                <AudioTrackControls 
                  sampleComponent={sampleComponent} 
                  onClickMute={onClickMute} 
                  onClickSolo={onClickSolo}
                  states={channelState}
                  onChangeChannelStates={onChangeChannelStates}
                  sampleName={sample.sampleName}
                  />
                  
              </div>
              <div className='channelSprites' style={{ width: '100%' }}>
                <div className='spritesContainer' style={{ width: '500px' }}>      
                  <div key={sample.sampleName} id={sample.id} className="sprite" ref={containerRef} />
                </div>
              </div>
            </div>        
          </>
        )
}
