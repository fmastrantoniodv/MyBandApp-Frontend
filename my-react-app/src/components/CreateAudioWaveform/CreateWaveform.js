import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

const CreateWaveform = (sound, soundName) => {
    const waveformRef = useRef(null);
    const [waveformComponent, setWaveformComponent] = useState(null)

    useEffect(() => {
      const wavesurfer = WaveSurfer.create({
        container: '#'+soundName,
        waveColor: 'black',
        progressColor: 'black',
        responsive: true,
        interact: false,
        cursorColor: 'chartreuse',
        cursorWidth: '2px',
        sampleRate: 4800
      });
      wavesurfer.load(sound.src);
      setWaveformComponent(wavesurfer)
      return () => wavesurfer.destroy();
    }, []);

    return waveformComponent;
  }

  export default CreateWaveform;