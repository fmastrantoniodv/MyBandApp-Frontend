import React, {useEffect} from 'react';
import '../views/studio';
import Button from './Button.js';
import VolumeController from './VolumeController/VolumeController';
import EQControls from "./EQControls"

const AudioTrackControls = (sample, btnMuteState, btnSoloState, btnRecState, onClickSolo, onClickMute) => {
    const sampleName = formatUpperFirstCase(sample.sample.name);
    
    useEffect(() => {
        console.log('[AudioTrackControls].[useEffect]')
    }, [sample]);

    const muteChannel = () => {
        sample.onClickMute()
    }

    const soloChannel = () => {
        sample.onClickSolo()
    }

    const recChannel = () => {
        //buttonState.rec ? setButtonState({rec: false}) : setButtonState({rec: true})
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