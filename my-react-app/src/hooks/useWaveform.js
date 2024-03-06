import { useEffect, useState, useContext } from 'react';
import WaveSurfer from 'wavesurfer.js';
import MasterAudioContext from '../contexts/MasterAudioContext'

const useWaveform = (src, soundID, containerRef) => {
    const [waveformComponent, setWaveformComponent] = useState(null)
    const {masterAudioCtx, mainGainNode, addArrayBuffers} = useContext(MasterAudioContext)
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
      console.log(`[useWaveform].[useEffect].[sample=${soundID}`)
      
      if (!containerRef.current) return 
      
      console.log(`[useWaveform].[useEffect].[containerRef`, containerRef)


      //audio.onended = () => stopProject()

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
        audioContext: masterAudioCtx,
        backend: 'WebAudio',
        //closeAudioContext: true    
      });

      wavesurfer.load(audio);

      wavesurfer.on('ready', () => {
        // Una vez que el audio se haya cargado, puedes acceder al buffer
        console.log('wavesurfer ready',wavesurfer)
        wavesurfer.backend.source = source      
        setWaveformComponent(wavesurfer)
        addArrayBuffers(wavesurfer.backend.buffer, soundID)
      });
      
      return () => {
        wavesurfer.destroy()
      };
    }, [containerRef,masterAudioCtx]);

    return waveformComponent
  }

  export default useWaveform;