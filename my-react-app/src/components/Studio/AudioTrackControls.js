import React, {useEffect, useState} from 'react';
import '../../views/studio';
import Button from './Button.js';
import VolumeController from '../VolumeController/VolumeController';
import EQControls from "./EQControls"
import useSettings from '../../hooks/useSettings';

const AudioTrackControls = ({sampleComponent, onClickMute, onClickSolo, states, onChangeChannelStates, sampleName}) => {
    //const displayName = formatUpperFirstCase(sampleName);
    const [muted, setMuted] = useState(false)
    const [solo, setSolo] = useState(false)
    const [rec, setRec] = useState(false)

    const { settings, saveSettings } = useSettings();

    /*  ######### metodo para borrar pista ##########
    const handleToggleDeleteTrack = () => {
        var newSettings = settings
        var updatedSoundsList = settings.soundsList.sounds.filter(sound => sound.id !== sample.name)
        newSettings.soundsList.sounds = updatedSoundsList;
        saveSettings(newSettings);
    };

    */

    useEffect(() => {
        console.log('[AudioTrackControls].[useEffect]')
        if(sampleComponent === null) return
        console.log('[AudioTrackControls].[useEffect].sampleComponent', sampleComponent)
        updateStates()
    }, [onChangeChannelStates, sampleComponent, states]);

    const muteChannel = (sampleComponent) => {
        onClickMute(sampleComponent)
    }

    const soloChannel = (sampleComponent) => {
        onClickSolo(sampleComponent)
    }

    const recChannel = (sampleComponent) => {
        //buttonState.rec ? setButtonState({rec: false}) : setButtonState({rec: true})
    }

    const updateStates = () => {
        console.log('() => updateStates')
        setMuted(states.muted)
        setSolo(states.solo)
        setRec(states.rec)
        onChangeChannelStates()
    }

    
    /*
    if(sample.waveform.audioCtx === undefined){
        return <span>loading</span>
    }
    
    return (
        <>
            <div className='audioControlsChannel'>

                <div className='audioControlsSample'>
                    <span className='displayName'>{sampleName}</span>
                    <div>
                        <Button textButton={'borrar'} onClickButton={()=> handleToggleDeleteTrack()}></Button>
                    </div>
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
        */

        if(sampleComponent === null) return <span>Loading</span>

        return (
            <>
                <div className='audioControlsChannel'>
                    <div className='audioControlsSample'>
                        <span className='displayName'>{sampleName}
                        </span>
                    </div>

                    <div className='audioControlsEQ'>
                        <EQControls waveformObj={sampleComponent} />
                    </div>

                    <div className='audioControlsVolume'>
                        <VolumeController sampleSource={sampleComponent} />
                    </div>
    
                    <div className='audioControlsOutputRouterButtons'>
                        <Button textButton='M' state={muted} onClickButton={() => muteChannel(sampleComponent)}/>
                        <Button textButton='S' state={solo} onClickButton={() => soloChannel(sampleComponent)}/>
                        <Button textButton='R' state={rec} onClickButton={() => recChannel(sampleComponent)}/>
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