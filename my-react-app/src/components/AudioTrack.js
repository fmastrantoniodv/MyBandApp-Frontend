import React, { useRef, useContext, useEffect, useState } from "react";
import useWaveform from "../hooks/useWaveform";
import Button from './Button.js';
import VolumeController from './VolumeController/VolumeController';
import EQControls from "./EQControls"

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
    console.log("sampleComponent: ",sampleComponent)

  }, [waveformPlayer, states, sampleComponent]);


  const onClickMute = () => {
    handleChannelStatesOnMute(sampleComponent)
  }

  const onClickSolo = () => {
    handleChannelStatesOnSolo(sampleComponent)
  }

  const onClickRec = () => {
    //buttonState.rec ? setButtonState({rec: false}) : setButtonState({rec: true})
}

  return (
          <>  
            <div className='channelContainer'>
              <div className='channelControls'>
              <div className='audioControlsChannel'>
                    <div className='audioControlsSample'>
                        <span className='displayName'>{sample.sampleName}</span>
                    </div>                     
                    <div className='audioControlsEQ'>
                        <EQControls waveformObj={sampleComponent} />
                    </div>
                    <div className='audioControlsVolume'>
                        <VolumeController sampleSource={sampleComponent} />
                    </div>
                    <div className='audioControlsOutputRouterButtons'>
                        <Button textButton='M' state={channelState.muted} onClickButton={() => onClickMute(sampleComponent)}/>
                        <Button textButton='S' state={channelState.solo} onClickButton={() => onClickSolo(sampleComponent)}/>
                        <Button textButton='R' state={channelState.rec} onClickButton={() => onClickRec(sampleComponent)}/>
                    </div>
                    <br />
                </div>

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
