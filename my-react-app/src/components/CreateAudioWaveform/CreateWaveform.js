import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

const CreateWaveform = (audioUrl) => {
    const waveformRef = useRef(null);
    const [waveformComponent, setWaveformComponent] = useState(null)
    console.log('Entro a CreateWaveForm')

    useEffect(() => {
      const wavesurfer = WaveSurfer.create({
        //container: waveformRef.current,
        container: '#spectro',
        waveColor: 'black',
        progressColor: 'black',
        responsive: true,
        interact: false,
        cursorColor: 'chartreuse',
        cursorWidth: '2px',
        sampleRate: 4800
      });
      console.log('pase por el useEffect del Waveform: '+audioUrl)
      wavesurfer.load(audioUrl);
      setWaveformComponent(wavesurfer)
      return () => wavesurfer.destroy();
    }, [audioUrl]);

    return [waveformComponent, 
    <div ref={waveformRef}
      style={{
        //width: sampleDuration/10+'px',
        border: 'solid #333333 1px',
        width: '20%',
        height: '111px'}}
        />]
  }  
  export default CreateWaveform;