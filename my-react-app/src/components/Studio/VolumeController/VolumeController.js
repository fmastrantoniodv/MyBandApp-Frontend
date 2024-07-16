import React, { useState } from 'react';
import '../../../App.css';
import '../../../views/studio';

function VolumeController({waveformObj}) {
    const [volumeValue, setVolumeValue] = useState(waveformObj.savedVolume);

    const handleOnChangeVolume = (e) => {
        if(!waveformObj.isMuted){
            waveformObj.backend.gainNode.gain.value = volumeValue
        }

        setVolumeValue(parseFloat(e.target.value));
        waveformObj.savedVolume = volumeValue
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