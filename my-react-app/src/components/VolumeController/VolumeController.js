import React from 'react';
import { useState, useRef } from 'react';
import '../../App.css';
import '../../views/studio';

function VolumeController({sampleSource}) {
    const [isDragging, setIsDragging] = useState(false);
    const [startPosition, setStartPosition] = useState(null);
    const [position, setPosition] = useState(10);
    const [pointerValue, setPointerValue] = useState(10);
    const [volumeValue, setVolumeValue] = useState(1);
    const divRef = useRef(null);

    function handleMouseDown(event) {
        setIsDragging(true);
        setStartPosition(event.clientY);
    }

    function handleMouseMove(event) {
        if (isDragging) {
            const deltaY = event.clientY - startPosition;
            const newPosition = Math.max(0, Math.min(100, position + deltaY / 0.7));
            
            setPosition(newPosition);
            setStartPosition(event.clientY);
            setPointerValue(pointerValue + event.movementY);
            var unity = 100 / 65;
            setVolumeValue(1-(unity/100*pointerValue));
            sampleSource.waveform.setVolume(volumeValue);
        }
    }

    function handleMouseUp() {
        setIsDragging(false);
    }

    return (
        <>
            <div 
            className='volume-container'
            onMouseUp={handleMouseUp}>
                <div
                className="volume-controller"
                onMouseMove={handleMouseMove}
                >
                    <div className="volume-bar" 
                    style={{ top: `${position}%` }} 
                    ref={divRef}
                    onMouseDown={handleMouseDown} />
                    </div>
                <span style={{margin: '5px 0px 5px 0px', fontSize: '10px'}}>Volumen</span>
            </div>
        </>
    );
}

export default VolumeController;