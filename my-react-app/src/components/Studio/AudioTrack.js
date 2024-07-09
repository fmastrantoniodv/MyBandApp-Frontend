import React, { useRef, useContext, useEffect, useState } from "react";
import useWaveform from "../../hooks/useWaveform";
import Button from './Button.js';
import VolumeController from './VolumeController/VolumeController';
import EQControls from "./EQControls"
import deleteIconSvg from '../../img/deleteIcon.svg'
import MasterAudioContext from '../../contexts/MasterAudioContext'

export default function AudioTrack ({ 
  sample, 
  handleDeleteChannel,
  soloChannelSelected,
  handleSoloChannel
}){
  const containerRef = useRef()
  const {getTrack, deleteTrack, onSoloChannel} = useContext(MasterAudioContext)
  const [loading, setLoading] = useState(true)
  console.log(sample)
  const url = `http://localhost:3001/api/samples/${sample.collectionCode}/${sample.sampleName}`

  const waveformPlayer = useWaveform(url, sample, containerRef)
  
  useEffect(() => {
    console.log('[AudioTrack.js].useEffect.waveformPlayer', waveformPlayer)
    if(waveformPlayer !== null){
      setLoading(false)
    }else{
      setLoading(true)
    }
  }, [waveformPlayer, containerRef]);

  const onClickMute = () => {
    getTrack(sample.sampleId).setMute(!getTrack(sample.sampleId).isMuted)
  }

  const onClickSolo = () => {
    onSoloChannel(sample.sampleId)
    handleSoloChannel(sample.sampleId)
  }

  const deleteChannel = ( sampleID ) => {
    handleDeleteChannel(sampleID)
    deleteTrack(sampleID)
  }

  const DeleteButton = () => {
    return(
      <button className="btn-delete-channel" 
        onClick={() => deleteChannel(sample.sampleId)}>
        <img 
          src={deleteIconSvg} 
          alt="icono de borrar"
        ></img>  
      </button>        
    )
  }
  
  const ChannelControls = () => {
    if(loading){
      return (
        <div className='channel-controls'>
          <div className='audio-controls-channel'>
            <div className='audio-controls-sample'>
              <span>Loading</span>
            </div>
          </div>
        </div>
        )
    }
    return (
            <div className='channel-controls'>
              <div className='audio-controls-channel'>
                <div className='audio-controls-sample'>
                  <div className='channel-settings'>
                    <DeleteButton />
                    <span className='display-name'>{sample.sampleName}</span>
                  </div>
                  <EQControls waveformObj={getTrack(sample.id)}/>
                </div>
                <VolumeController waveformObj={getTrack(sample.id)} />
                <div className='audio-controls-output-router-buttons'>
                  <Button faderID={sample.id} textButton='M' state={getTrack(sample.id).isMuted} onClickButton={() => onClickMute()}/>
                  <Button faderID={sample.id} textButton='S' state={sample.id === soloChannelSelected} onClickButton={() => onClickSolo(getTrack(sample.id))}/>
                </div>
              </div>
            </div>
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
