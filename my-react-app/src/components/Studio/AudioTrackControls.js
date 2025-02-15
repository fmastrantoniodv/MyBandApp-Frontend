import React, {useEffect, useState} from 'react';
import '../../views/studio';
import Button from './Button.js';
import VolumeController from '../VolumeController/VolumeController';
import EQControls from "./EQControls"

const AudioTrackControls = ({sampleComponent, onClickMute, onClickSolo, states, onChangeChannelStates, sampleName}) => {
    const [muted, setMuted] = useState(false)
    const [solo, setSolo] = useState(false)
    const [rec, setRec] = useState(false)

    useEffect(() => {
        if(sampleComponent === null) return
        updateStates()
    }, [onChangeChannelStates, sampleComponent, states]);

    const muteChannel = (sampleComponent) => {
        onClickMute(sampleComponent)
    }

    const soloChannel = (sampleComponent) => {
        onClickSolo(sampleComponent)
    }

    const updateStates = () => {
        setMuted(states.muted)
        setSolo(states.solo)
        setRec(states.rec)
        onChangeChannelStates()
    }

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

export default AudioTrackControls;