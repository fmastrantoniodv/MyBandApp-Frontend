import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

const CreateWaveform = (sound, soundName, audioContext) => {

    const [waveformComponent, setWaveformComponent] = useState(null)
    
    useEffect(() => {
      const audio = new Audio()
      audio.controls = true
      audio.src = sound.src

      const wavesurfer = WaveSurfer.create({
        container: '#'+soundName,
        waveColor: 'black',
        progressColor: 'black',
        responsive: true,
        interact: false,
        cursorColor: 'chartreuse',
        cursorWidth: '2px',
        sampleRate: 4800,
        audioContext: audioContext,
        key: soundName
      });

      wavesurfer.load(audio);
      setWaveformComponent(wavesurfer)
      return () => wavesurfer.destroy();
    }, []);

    return waveformComponent;
  }

  export default CreateWaveform;