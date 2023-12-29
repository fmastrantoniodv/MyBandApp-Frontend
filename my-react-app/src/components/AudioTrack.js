import React, { useRef, useContext, useEffect, useState } from "react";
import useWaveform from "../hooks/useWaveform";
import Button from './Button.js';
import VolumeController from './VolumeController/VolumeController';
import EQControls from "./EQControls"
import deleteIconSvg from '../img/deleteIcon.svg'
import configIconSvg from '../img/configIcon.svg'


// npx http-server ./public --cors
const PUBLICROOT = 'http://127.0.0.1:8080/'

export default function AudioTrack ({ sample, handleChannelStatesOnSolo, handleChannelStatesOnMute, states, playing, handleDeleteChannel}) {
  const [channelState, setChannelsState] = useState({solo: false, muted: false, rec: false})
  const [sampleComponent, setSampleComponent] = useState(null)
  const [eqValues, setEqValues] = useState(sample.channelConfig.EQ)
  const containerRef = useRef()
  
  var localAudioSrc;
  //HARDCODE PARA QUE TOME LAS URL LOCALES
  if(sample.id === "sample1"){
    localAudioSrc = PUBLICROOT+'samples/'+sample.id+".wav";
  }else{
    localAudioSrc = PUBLICROOT+'samples/'+sample.id+".mp3";
  }

  const waveformPlayer = useWaveform(localAudioSrc, sample.id, containerRef)
  
  useEffect(() => {
    /*
    console.log('[AudioTrack].[useEffect].playing',playing)
    console.log('[AudioTrack].[useEffect].sample',sample)
    console.log('[AudioTrack].[useEffect].states', states)
    */
    setChannelsState(states)
    
    if(sampleComponent !== null){
      /*console.log('[channelState].[sample '+sample.id+'].[setMute]', channelState)*/
      sampleComponent.setMute(states.muted)
    }

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
    
    //console.log('[AudioTrack].[useEffect].sampleName: '+sample.sampleName+" ChannelState: ",channelState)
    if (!waveformPlayer) return
    
    setSampleComponent(waveformPlayer)
    calculateWidthWaveform()
    
  }, [waveformPlayer, states, sampleComponent, playing]);
  

  const onClickMute = () => {
    handleChannelStatesOnMute(sampleComponent.mediaContainer.id)
  }

  const onClickSolo = () => {
    handleChannelStatesOnSolo(sampleComponent.mediaContainer.id)
  }

  const onClickRec = () => {
    //buttonState.rec ? setButtonState({rec: false}) : setButtonState({rec: true})
  }

  const calculateWidthWaveform = () =>{
    var anchoContainerSprite = document.getElementById('root').clientWidth;
    //console.log('root: ',anchoContainerSprite)
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

  const EditButton = () => {
    return(
      <button className="btn-edit-channel" 
        //onClick={() => deleteChannel(sample.id)}
        >
        <img 
          src={configIconSvg} 
          alt="icono de configuracion"
          width="100%"
        ></img>  
      </button>        
    )
  }

  return (
          <>  
            <div className='channel-container'>
              <div className='channel-controls'>
              <div className='audio-controls-channel'>
                    <div className='audio-controls-sample'>
                      <div className='channel-settings'>
                        <DeleteButton />
                        <EditButton />
                        <button onClick={() => console.log(channelState, sampleComponent, eqValues)}>ConsoleLog</button>
                        <span className='display-name'>{sample.sampleName}</span>
                      </div>
                      <div className='audio-controls-eq'>
                          <EQControls waveformObj={sampleComponent} eqValues={eqValues} onChangeEqValues={onChangeEQValues}/>
                      </div>
                    </div>
                    <div className='audio-controls-volume'>
                        <VolumeController sampleSource={sampleComponent} />
                    </div>
                    <div className='audio-controls-output-router-buttons'>
                        <Button faderID={sample.id} textButton='M' state={channelState.muted} onClickButton={() => onClickMute(sampleComponent)}/>
                        <Button faderID={sample.id} textButton='S' state={channelState.solo} onClickButton={() => onClickSolo(sampleComponent)}/>
                    </div>
                    <br />
                </div>

              </div>
              <div className='channel-sprites' style={{ width: '100%' }}>
                <div className='sprites-container' style={{ width: '90%' }}>      
                  <div id={sample.id} className="sprite" ref={containerRef} />
                </div>
              </div>
            </div>        
          </>
        )
}
