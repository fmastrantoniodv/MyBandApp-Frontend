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
  const containerRef = useRef()
  const {getTrack, deleteTrack} = useContext(MasterAudioContext)
  const [loading, setLoading] = useState(true)
  
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
      console.log('[AudioTrack].getTrack=',getTrack(sample.id))
      getTrack(sample.id).setMute(states.muted)
      setLoading(false)
    }
    
    if(playing === 'true'){
      getTrack(sample.id).play()
      return
    }else if(playing === 'false' && getTrack(sample.id)){
      getTrack(sample.id).stop()
      return
    }else if(playing === 'pause'){
      getTrack(sample.id).pause()
      return
    }
    
  }, [waveformPlayer, states, playing, containerRef, loading]);

  const onClickMute = () => {
    handleChannelStatesOnMute(getTrack(sample.id).mediaContainer.id)
  }

  const onClickSolo = () => {
    handleChannelStatesOnSolo(getTrack(sample.id).mediaContainer.id)
  }

  const deleteChannel = ( sampleID ) => {
    handleDeleteChannel(sampleID)
    deleteTrack(sampleID)
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
  
  const ChannelControls = () => {
    if(loading){
      console.log('[AudioTrack].loading', loading)
      return <span>Loading</span>
    }
    return (
          <>  
            <div className='channel-controls'>
                <div className='audio-controls-channel'>
                    <div className='audio-controls-sample'>
                      <div className='channel-settings'>
                        <DeleteButton />
                        <span className='display-name'>{sample.sampleName}</span>
                        <button onClick={()=>{console.log(getTrack(sample.id).backend)}}>Test</button>
                      </div>
                      <div className='audio-controls-eq'>
                        <EQControls waveformObj={getTrack(sample.id)}/>
                      </div>
                    </div>
                    <div className='audio-controls-volume'>
                        <VolumeController waveformObj={getTrack(sample.id)} />
                    </div>
                    <div className='audio-controls-output-router-buttons'>
                        <Button faderID={sample.id} textButton='M' state={channelState.muted} onClickButton={() => onClickMute(getTrack(sample.id))}/>
                        <Button faderID={sample.id} textButton='S' state={channelState.solo} onClickButton={() => onClickSolo(getTrack(sample.id))}/>
                    </div>
                </div>
            </div>
          </>
    )
  }

    return (
    <div className='channel-container'>
      <ChannelControls />
      <div className='channel-sprites'>
        <div className='sprites-container'>
          <div id={sample.id} className="sprite" ref={containerRef} />
        </div>
      </div>
    </div>
    )
  }
