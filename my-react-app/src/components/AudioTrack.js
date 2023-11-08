import React, { useRef, useContext, useEffect, useState } from "react";
import useWaveform from "../hooks/useWaveform";
import Button from './Button.js';
import VolumeController from './VolumeController/VolumeController';
import EQControls from "./EQControls"
import deleteIconSvg from '../img/deleteIcon.svg'


// npx http-server ./public --cors
const PUBLICROOT = 'http://127.0.0.1:8080/'

export default function AudioTrack ({ sample, handleChannelStatesOnSolo, handleChannelStatesOnMute, states, playing, handleDeleteChannel }) {
  const [channelState, setChannelsState] = useState({solo: false, muted: false, rec: false})
  const [sampleComponent, setSampleComponent] = useState(null)
  const [eqValues, setEqValues] = useState(sample.channelConfig.EQ)
  const containerRef = useRef()
  
  //HARDCODE PARA QUE TOME LAS URL LOCALES
  const localAudioSrc = PUBLICROOT+'samples/'+sample.id+".mp3";
  const waveformPlayer = useWaveform(localAudioSrc, sample.id, containerRef)
  
  useEffect(() => {
    console.log('[AudioTrack].[useEffect].playing',playing)
    console.log(sample)
    console.log(playing)
    if(playing === 'true'){
      sampleComponent.play()
      return
    }else if(playing === 'false' && sampleComponent !== null){
      sampleComponent.stop()
      return
    }else if(playing === 'pause'){
      sampleComponent.pause()
      return
    }

    console.log('[AudioTrack].[useEffect].sample',sample)
    console.log('[AudioTrack].[useEffect].states', states)
    setChannelsState(states)
    console.log('[AudioTrack].[useEffect].sampleName: '+sample.sampleName+" ChannelState: ",channelState)
    if (!waveformPlayer) return
    
    setSampleComponent(waveformPlayer)
    calculateWidthWaveform()
    console.log(waveformPlayer)
    console.log("sampleComponent: ",sampleComponent)
    
  }, [waveformPlayer, states, sampleComponent, playing]);
  

  const onClickMute = () => {
    handleChannelStatesOnMute(sampleComponent)
  }

  const onClickSolo = () => {
    handleChannelStatesOnSolo(sampleComponent)
  }

  const onClickRec = () => {
    //buttonState.rec ? setButtonState({rec: false}) : setButtonState({rec: true})
  }

  const calculateWidthWaveform = () =>{
    var anchoContainerSprite = document.getElementById('root').clientWidth;
    console.log('root: ',anchoContainerSprite)
  }

  const deleteChannel = ( sampleID ) => {
    handleDeleteChannel(sampleID)
  }

  const onChangeEQValues = ( values ) => {
    setEqValues(values)
  }

  const DeleteButton = () => {
    return(
      <button className="btn-delete-channel" 
        onClick={() => deleteChannel(sample.id)}>
        <img 
          src={deleteIconSvg} 
          alt="icono de borrar"
        ></img>  
      </button>        
    )
  }

  return (
          <>  
            <div className='channelContainer'>
              <div className='channelControls'>
              <div className='audioControlsChannel'>
                    <div className='audioControlsSample'>
                        <DeleteButton />
                        <span className='displayName'>{sample.sampleName}</span>
                    </div>
                    <div className='audioControlsEQ'>
                        <EQControls waveformObj={sampleComponent} eqValues={eqValues} onChangeEqValues={onChangeEQValues}/>
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
                <div className='spritesContainer' style={{ width: '90%' }}>      
                  <div key={sample.sampleName} id={sample.id} className="sprite" ref={containerRef} />
                </div>
              </div>
            </div>        
          </>
        )
}
