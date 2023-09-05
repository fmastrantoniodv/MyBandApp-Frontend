import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

const CreateWaveform = (sound, soundName) => {

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
        key: soundName,
        fillParent: true,
        minPxPerSec: 10,
        hideScrollbar: true,
        height: 108
      });

      wavesurfer.load(audio);

      const audioContext = new AudioContext()

      const source = audioContext.createMediaElementSource(audio)

      wavesurfer.audioCtx = audioContext;
      wavesurfer.source = source;

      setWaveformComponent(wavesurfer)

      return () => {
        wavesurfer.destroy()
      };
    }, []);

    return waveformComponent;
  }



  export default CreateWaveform;