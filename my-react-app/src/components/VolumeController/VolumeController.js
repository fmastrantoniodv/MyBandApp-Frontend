import React from 'react';
import { useState, useRef } from 'react';
import '../../App.css';
import '../../views/studio';

function VolumeController({sampleSource}) {
    const [volumeValue, setVolumeValue] = useState(0.9);

    const handleOnChangeVolume = (e) => {
        setVolumeValue(parseFloat(e.target.value));
        sampleSource.setVolume(volumeValue);
      };

    return(
        <>
            <div className='volume-container'>
                <input
                    className='volume-range-controller'
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volumeValue}
                    onChange={handleOnChangeVolume}
                    />
                <label>Volume</label>
            </div>
        </>
    )
}

export default VolumeController;