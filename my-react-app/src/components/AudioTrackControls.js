import React, {useState, useContext} from 'react';
import '../views/studio';
import Button from './Button.js';
import VolumeController from './VolumeController/VolumeController';
import ProjectContext from "../contexts/ProjectContext";

const AudioTrackControls = (sample, sampleName) => {
    const context = useContext(ProjectContext);
    console.log('AudioTrackControls')
    console.log(sampleName)
    const [volume, setVolume] = useState(0.7)
    const [muted, setMuted] = useState(false)

    const muteChannel = () => {
        muted === true ? setMuted(false) : setMuted(true)
        this.props.sample.mute(this.state.muted)
    }

    const soloChannel = () => {
        console.log('solo')
    }

    return (
        <>
            <div className='audioControlsChannel'>
                <div className='audioControlsSample'>
                    <span className='displayName'>{sample.name}</span>
                </div>
                <div className='audioControlsEQ'></div>
                <div className='audioControlsVolume'>
                
                <VolumeController sampleSource={sample}></VolumeController>
                </div>
                <div className='audioControlsOutputRouterButtons'>
                    <Button textButton='M' onClickButton={() => {muteChannel()}}/>
                    <Button textButton='S' onClickButton={soloChannel()}/>
                    <Button textButton='R' onClickButton={() => {}}/>
                </div>
                <br />
            </div>
        </>
    )
} 

export default AudioTrackControls;