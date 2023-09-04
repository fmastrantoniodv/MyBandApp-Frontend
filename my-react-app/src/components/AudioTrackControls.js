import React, {useState, useContext, useEffect} from 'react';
import '../views/studio';
import Button from './Button.js';
import VolumeController from './VolumeController/VolumeController';
import ProjectContext from "../contexts/ProjectContext";
import { useAudioContext } from "../contexts/ProjectContext"
import EQController from "./EQController"

const AudioTrackControls = (sample, audioElement) => {
    const { dataContext, updateContext } = useContext(ProjectContext);
    const sampleName = sample.sample.name;
    const [volume, setVolume] = useState(0.7)
    const [muted, setMuted] = useState(false)
    const [buttonState, setButtonState] = useState({ mute: false, solo: false, rec: false})
    const audioContext = useAudioContext();
    
    /*
    useEffect(() => {
        createGainNode(audioElement)
      }, [audioContext]);
    */

    const createGainNode = (audioElement) => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createMediaElementSource(audioElement);
        const gainNode = audioContext.createGain();
        source.connect(gainNode);
        gainNode.connect(audioContext.destination);
    
        //audioRefs.push(gainNode);
        
      }
    
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

    return (
        <>
            <div className='audioControlsChannel'>
                <div className='audioControlsSample'>
                    <span className='displayName'>{formatUpperFirstCase(sampleName)}</span>
                </div>
                <div className='audioControlsEQ'></div>
                
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