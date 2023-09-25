import React, {useEffect, useState} from 'react';
import '../views/studio';
import Button from './Button.js';
import VolumeController from './VolumeController/VolumeController';
import EQControls from "./EQControls"

const AudioTrackControls = ({sample, onChangeChannelStates, onClickSolo, onClickMute}) => {
    const sampleName = formatUpperFirstCase(sample.name);
    const [muted, setMuted] = useState(false)
    const [solo, setSolo] = useState(false)
    const [rec, setRec] = useState(false)

    useEffect(() => {
        console.log('[AudioTrackControls].[useEffect]')
        console.log(sample)
        updateStates()
    }, [onChangeChannelStates]);

    const muteChannel = () => {
        onClickMute()
    }

    const soloChannel = () => {
        onClickSolo()
    }

    const recChannel = () => {
        //buttonState.rec ? setButtonState({rec: false}) : setButtonState({rec: true})
    }

    const updateStates = () => {
        console.log('() => updateStates')
        setMuted(sample.soundStates.muted)
        setSolo(sample.soundStates.solo)
        setRec(sample.soundStates.rec)
    }

    
    
    if(sample.waveform.audioCtx === undefined){
        return <span>loading</span>
    }

    return (
        <>
            <div className='audioControlsChannel'>

                <div className='audioControlsSample'>
                    <span className='displayName'>{sampleName}</span>
                </div>

                <div className='audioControlsEQ'>
                    <EQControls waveformObj={sample.waveform} />
                </div>
                <div className='audioControlsVolume'>
                    <VolumeController sampleSource={sample} />
                </div>

                <div className='audioControlsOutputRouterButtons'>
                    <Button textButton='M' state={muted} onClickButton={() => muteChannel()}/>
                    <Button textButton='S' state={solo} onClickButton={() => soloChannel()}/>
                    <Button textButton='R' state={rec} onClickButton={() => recChannel()}/>
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