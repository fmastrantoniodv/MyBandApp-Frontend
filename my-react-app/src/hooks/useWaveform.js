import React, { useEffect, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

const useWaveform = (src, soundID, containerRef) => {
    const [waveformComponent, setWaveformComponent] = useState(null)
    
    useEffect(() => {
      console.log(`[useWaveform].[useEffect].[sample=${soundID}`)
      
      if (!containerRef.current) return 


      console.log(console.log(`[useWaveform].[useEffect].[containerRef`, containerRef))

      const audio = new Audio()
      audio.crossOrigin = "anonymous"
      audio.controls = true
      audio.src = src
      audio.autoplay = false
      audio.id = soundID
      //audio.onended = () => stopProject()
    
      const audioCtx = new AudioContext();
      const source = audioCtx.createMediaElementSource(audio);

      const wavesurfer = WaveSurfer.create({
        container: containerRef.current,
        waveColor: 'black',
        progressColor: 'black',
        responsive: true,
        interact: false,
        cursorColor: 'chartreuse',
        cursorWidth: '2px',
        sampleRate: 4800,
        key: audio.id,
        fillParent: true,
        minPxPerSec: 10,
        hideScrollbar: true,
        height: 111,
        mediaControls: true,
        mediaType: 'audio',
        audioContext: audioCtx,
        backend: 'MediaElement',
        closeAudioContext: true        
      });

      wavesurfer.audioElement = audio;
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

  export default useWaveform;