import React, {useState, useContext, useEffect} from 'react';
import '../views/studio';
import Button from './Button.js';
import VolumeController from './VolumeController/VolumeController';
import ProjectContext from "../contexts/ProjectContext";
import { useAudioContext } from "../contexts/ProjectContext"
import EQControls from "./EQControls"
import CreateWaveform from './CreateAudioWaveform/CreateWaveform';

const AudioTrackControls = (sample) => {
    const sampleName = sample.sample.name;
    const [buttonState, setButtonState] = useState({ mute: false, solo: false, rec: false})
    
    /*
    useEffect(() => {
        
      }, [audioContext]);
    */
    
    const muteChannel = () => {
        sample.sample.onMute()
        buttonState.mute ? setButtonState({mute: false}) : setButtonState({mute: true})
    }

    const soloChannel = () => {
        sample.sample.onSolo()
        buttonState.solo ? setButtonState({solo: false}) : setButtonState({solo: true})
    }

    const recChannel = () => {
        buttonState.rec ? setButtonState({rec: false}) : setButtonState({rec: true})
    }

    if(sample.sample.waveform.audioCtx === undefined){
        return <span>loading</span>
    }

    return (
        <>
            <div className='audioControlsChannel'>
                <div className='audioControlsSample'>
                    <span className='displayName'>{formatUpperFirstCase(sampleName)}</span>
                </div>
                <div className='audioControlsEQ'></div>
                <EQControls waveformObj={ sample.sample.waveform }/>
                <div className='audioControlsVolume'>
                <VolumeController sampleSource={sample}></VolumeController>
                </div>

                <div className='audioControlsOutputRouterButtons'>
                    <Button textButton='M' state={buttonState.mute} onClickButton={() => muteChannel()}/>
                    <Button textButton='S' state={buttonState.solo} onClickButton={() => soloChannel()}/>
                    <Button textButton='R' state={buttonState.rec} onClickButton={() => recChannel()}/>
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