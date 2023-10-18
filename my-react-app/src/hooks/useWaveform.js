import WaveSurfer from "wavesurfer.js"
import React, { useRef, useState, useEffect, useCallback } from "react"

// WaveSurfer hook
const useWavesurfer = (sound, containerRef, options) => {
    const [waveformComponent, setWaveformComponent] = useState(null)
    // Initialize wavesurfer when the container mounts
    // or any of the props change
    useEffect(() => {
      if (!containerRef.current) return
      
      console.log('useWavesufer')
      console.log(sound)
      const audio = new Audio()
      audio.controls = true
      audio.src = sound.src
      audio.autoplay = false
      audio.id = sound.id

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
        height: 108,
        mediaControls: true,
        mediaType: 'audio',
        audioContext: audioCtx,
        backend: 'MediaElement',
        closeAudioContext: true
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

export default useWavesurfer