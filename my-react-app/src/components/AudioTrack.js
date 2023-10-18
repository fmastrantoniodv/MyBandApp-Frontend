import React, { useRef, useContext, useEffect, useState } from "react";
import AudioTrackControls from "./AudioTrackControls";
import useWaveform from "./CreateAudioWaveform/useWaveform";

const PUBLICROOT = '../../public'

export default function AudioTrack ({ sample, handleChannelStatesOnSolo, handleChannelStatesOnMute, states }) {
  const [channelState, setChannelsState] = useState({solo: false, muted: false, rec: false})
  const [sampleComponent, setSampleComponent] = useState(null)
  const containerRef = useRef()
  //const waveformPlayer = CreateWaveform(sample.src, sample.sampleName, containerRef)
  
  //HARDCODE PARA QUE TOME LAS URL LOCALES
  const localAudioSrc = PUBLICROOT+'/samples/'+sample.id+".mp3";
  console.log(localAudioSrc)
  const waveformPlayer = useWaveform(localAudioSrc, sample.id, containerRef)
  
  useEffect(() => {
    console.log('[AudioTrack].[useEffect].sample',sample)
    if (!waveformPlayer) return
    if(sample !== undefined){
      console.log('[AudioTrack].[useEffect].containerRef.current',containerRef.current)
    }
    setSampleComponent(waveformPlayer)
    console.log(waveformPlayer)

  },[containerRef.current , waveformPlayer]);


  const onClickMute = () => {
    handleChannelStatesOnMute(sample)
  }

  const onClickSolo = () => {
    handleChannelStatesOnSolo(sample)
  }

  const onChangeChannelStates = () => {
    setChannelsState(states)
  }
  
  if(sampleComponent) return 

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
