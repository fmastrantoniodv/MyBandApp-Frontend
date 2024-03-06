import React, { useRef, useContext, useEffect, useState } from "react";
import useWaveform from "../hooks/useWaveform";
import Button from './Button.js';
import VolumeController from './VolumeController/VolumeController';
import EQControls from "./EQControls"
import deleteIconSvg from '../img/deleteIcon.svg'
import MasterAudioContext from '../contexts/MasterAudioContext'

// npx http-server ./public --cors
const PUBLICROOT = 'http://127.0.0.1:8080/'

export default function AudioTrack ({ 
  sample, 
  handleChannelStatesOnSolo, 
  handleChannelStatesOnMute, 
  states, 
  playing, 
  handleDeleteChannel}){

  const [channelState, setChannelsState] = useState({solo: false, muted: false, rec: false})
  const [eqValues, setEqValues] = useState(sample.channelConfig.EQ)
  const containerRef = useRef()
  const {updateArrayBuffer, addTrackToList} = useContext(MasterAudioContext)
  
  var localAudioSrc;
  //HARDCODE PARA QUE TOME LAS URL LOCALES
  if(sample.id === "sample1"){
    localAudioSrc = PUBLICROOT+'samples/'+sample.id+".wav";
  }else{
    localAudioSrc = PUBLICROOT+'samples/'+sample.id+".mp3";
  }

  const waveformPlayer = useWaveform(localAudioSrc, sample.id, containerRef)
  
  useEffect(() => {

    setChannelsState(states)
    if(waveformPlayer !== null){
      console.log('[AudioTrack].[useEffect].waveformPlayer', waveformPlayer)
      waveformPlayer.setMute(states.muted)
      //updateArrayBuffer(waveformPlayer)
      addTrackToList(waveformPlayer)
    }
    
    if(playing === 'true'){
      waveformPlayer.play()
      return
    }else if(playing === 'false' && waveformPlayer !== null){
      waveformPlayer.stop()
      return
    }else if(playing === 'pause'){
      waveformPlayer.pause()
      return
    }
    
  }, [waveformPlayer, states, playing]);
  

  const onClickMute = () => {
    handleChannelStatesOnMute(waveformPlayer.mediaContainer.id)
  }

  const onClickSolo = () => {
    handleChannelStatesOnSolo(waveformPlayer.mediaContainer.id)
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
            <div className='channel-container'>
              <div className='channel-controls'>
              <div className='audio-controls-channel'>
                    <div className='audio-controls-sample'>
                      <div className='channel-settings'>
                        <DeleteButton />
                        <span className='display-name'>{sample.sampleName}</span>
                        <button onClick={()=>{console.log(waveformPlayer.backend)}}>Test</button>
                      </div>
                      <div className='audio-controls-eq'>
                        <EQControls waveformObj={waveformPlayer} eqValues={eqValues} onChangeEqValues={onChangeEQValues}/>
                      </div>
                    </div>
                    <div className='audio-controls-volume'>
                        <VolumeController waveformObj={waveformPlayer} />
                    </div>
                    <div className='audio-controls-output-router-buttons'>
                        <Button faderID={sample.id} textButton='M' state={channelState.muted} onClickButton={() => onClickMute(waveformPlayer)}/>
                        <Button faderID={sample.id} textButton='S' state={channelState.solo} onClickButton={() => onClickSolo(waveformPlayer)}/>
                    </div>
                </div>
              </div>
              <div className='channel-sprites'>
                <div className='sprites-container' >      
                  <div id={sample.id} className="sprite" ref={containerRef} />
                </div>
              </div>
            </div>       
          </>
        )
  }
