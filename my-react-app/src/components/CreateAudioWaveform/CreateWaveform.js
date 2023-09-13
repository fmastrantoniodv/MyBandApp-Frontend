import React, { useEffect, useState, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

const CreateWaveform = (sound, soundName, containerRef) => {
    const [waveformComponent, setWaveformComponent] = useState(null)

    useEffect(() => {
      console.log('[CreateWaveform].[useEffect]')
      if (!containerRef.current) return

      const audio = new Audio()
      audio.controls = true
      audio.src = sound.src

      const audioCtx = new AudioContext();
      const source = audioCtx.createMediaElementSource(audio);

      const wavesurfer = WaveSurfer.create({
        //container: '#'+soundName,
        //container: refContainer.current,
        container: containerRef.current,
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
    }, [containerRef]);

    return waveformComponent;
  }

  export default CreateWaveform;