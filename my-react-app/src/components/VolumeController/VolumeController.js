import React, { useEffect } from 'react';
import { useState } from 'react';
import '../../App.css';
import '../../views/studio';

function VolumeController({waveformObj}) {
    const [volumeValue, setVolumeValue] = useState(waveformObj.savedVolume);

    const handleOnChangeVolume = (e) => {
        setVolumeValue(parseFloat(e.target.value));
        waveformObj.backend.gainNode.gain.value = volumeValue
        waveformObj.savedVolume = volumeValue
    };

    return(
        <div className='audio-controls-volume'>
            <div className='volume-container'>
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
                    <input
                        className='volume-range-controller'
                        type="range"
                        min="0"
                        max="1"
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