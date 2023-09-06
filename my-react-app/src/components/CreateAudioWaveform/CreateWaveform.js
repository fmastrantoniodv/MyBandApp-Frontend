import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

const CreateWaveform = (sound, soundName) => {

    const [waveformComponent, setWaveformComponent] = useState(null)

    useEffect(() => {
      const audio = new Audio()
      audio.controls = true
      audio.src = sound.src

      const audioCtx = new AudioContext();
      const source = audioCtx.createMediaElementSource(audio);

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
        height: 108,
        mediaControls: true,
        mediaType: 'audio',
        audioContext: audioCtx,
        backend: 'MediaElement'
      });

      wavesurfer.audioCtx = audioCtx;
      wavesurfer.source = source

      wavesurfer.load(audio);


      setWaveformComponent(wavesurfer)

      return () => {
        wavesurfer.destroy()
      };
    }, []);

    return waveformComponent;
  }



  export default CreateWaveform;