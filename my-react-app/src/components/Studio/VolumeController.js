import React, { useState } from 'react';

function VolumeController({sample}) {
    const [volumeValue, setVolumeValue] = useState(sample.channelConfig.volume);

    const handleOnChangeVolume = (e) => {
        if(!sample.waveformComponent.isMuted){
            sample.waveformComponent.backend.gainNode.gain.value = volumeValue
        }

        setVolumeValue(parseFloat(e.target.value));
        sample.waveformComponent.savedVolume = volumeValue
        sample.channelConfig.volume = volumeValue
    };

    return(
        <div className='audio-controls-volume'>
            <div className='volume-container'>
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
                    <input
                        className='volume-range-controller'
                        type="range"
                        min="-0.02"
                        max="1.02"
                        step="0.01"
                        value={volumeValue}
                        onChange={handleOnChangeVolume}
                        />
                </div>
                <label style={{display: 'flex', marginTop: '5px'}}>Volume</label>
            </div>
        </div>
    )
}

export default VolumeController;