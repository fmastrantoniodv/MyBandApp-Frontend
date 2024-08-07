import { useEffect, useState, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

const AudioContext = window.AudioContext || window.webkitAudioContext;
var masterAudioCtx = new AudioContext
const mainGainNode = masterAudioCtx.createGain()

const useAudioComponent = (sampleInfo, containerRef) => {
    const [waveformComponent, setWaveformComponent] = useState(null)
    const src = `http://localhost:3001/api/samples/${sampleInfo.collectionCode}/${sampleInfo.sampleName}`
    const soundID = sampleInfo.id

    const audio = new Audio()
    audio.crossOrigin = "anonymous"
    audio.controls = true
    audio.src = src
    audio.autoplay = false
    audio.id = soundID
    const source = masterAudioCtx.createMediaElementSource(audio);
    const gain = masterAudioCtx.createGain();
    source.connect(gain)
    
    gain.connect(mainGainNode)

    useEffect(() => {
      if (!containerRef.current) return

      const wavesurfer = WaveSurfer.create({
        container: containerRef.current,
        waveColor: 'black',
        progressColor: 'black',
        responsive: true,
        interact: false,
        cursorColor: 'chartreuse',
        cursorWidth: '2px',
        key: audio.id,
        fillParent: true,
        minPxPerSec: 10,
        hideScrollbar: true,
        height: 111,
        mediaControls: true,
        mediaType: 'audio',
        audioContext: masterAudioCtx,
        backend: 'WebAudio'
        //closeAudioContext: true    
      });

      wavesurfer.load(audio);
      wavesurfer.on('ready', () => {
        wavesurfer.backend.source = source
        setWaveformComponent(wavesurfer)
      });

      return () => {
        wavesurfer.destroy()
      };
    }, []);

    return waveformComponent
  }

  export default useAudioComponent;