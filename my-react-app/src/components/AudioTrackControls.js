import React, {useState, useContext, useEffect} from 'react';
import '../views/studio';
import Button from './Button.js';
import VolumeController from './VolumeController/VolumeController';
import EQControls from "./EQControls"
import AudioTracksContext from '../contexts/AudioTracksContext';

const AudioTrackControls = (sample) => {
    const sampleName = formatUpperFirstCase(sample.sample.name);
    const [btnMuteState, setBtnMuteState] = useState(false)
    const [btnSoloState, setBtnSoloState] = useState(false)
    const [btnRecState, setBtnRecState] = useState(false)
    const {tracks, setTracks} = useContext(AudioTracksContext)

    
    useEffect(() => {
        console.log('[AudioTrackControls].[useEffect]')
        console.log(tracks)
        const contextObject = tracks.find(value => value.id === sample.sample.name)
    
        if(contextObject !== undefined){
            actualizarButtonsStates(contextObject.states)
        }
    
    }, [sample, tracks.states]);

    const actualizarButtonsStates = (soundStates) => {
        setBtnMuteState(soundStates.muted)
        setBtnSoloState(soundStates.solo)
        setBtnRecState(soundStates.rec)
    }
    
    const muteChannel = () => {
        sample.sample.onMute()
        updateStatesOnAction()
    }

    const soloChannel = () => {
        sample.sample.onSolo()
        updateStatesOnAction()
    }

    const recChannel = () => {
        //buttonState.rec ? setButtonState({rec: false}) : setButtonState({rec: true})
    }

    const updateStatesOnAction = () => {
        const updateStateValue = tracks.map((fila) => {
            if (fila.id === sample.sample.name) {
                return { ...fila, states: sample.sample.soundStates}; // Editar los estados
            }
            return fila;
          });
      
          // Actualizar el estado con el nuevo array que contiene los cambios
          setTracks(updateStateValue);
    }

    if(sample.sample.waveform.audioCtx === undefined){
        return <span>loading</span>
    }

    return (
        <>
            <div className='audioControlsChannel'>

                <div className='audioControlsSample'>
                    <span className='displayName'>{sampleName}</span>
                </div>

                <div className='audioControlsEQ'>
                    <EQControls waveformObj={sample.sample.waveform} />
                </div>

                <div className='audioControlsVolume'>
                    <VolumeController sampleSource={sample} />
                </div>

                <div className='audioControlsOutputRouterButtons'>
                    <Button textButton='M' state={btnMuteState} onClickButton={() => muteChannel()}/>
                    <Button textButton='S' state={btnSoloState} onClickButton={() => soloChannel()}/>
                    <Button textButton='R' state={btnRecState} onClickButton={() => recChannel()}/>
                </div>

                <br />

            </div>
        </>
    )
} 

function formatUpperFirstCase( param ){
    return param.charAt(0).toUpperCase()+param.substring(1);
  }

export default AudioTrackControls;