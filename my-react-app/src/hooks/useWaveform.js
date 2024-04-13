import { useEffect, useState, useContext } from 'react';
import WaveSurfer from 'wavesurfer.js';
import MasterAudioContext from '../contexts/MasterAudioContext'

const useWaveform = (src, soundID, containerRef) => {
    const [waveformComponent, setWaveformComponent] = useState(null)
    const {masterAudioCtx, mainGainNode, addArrayBuffers, addTrackToList} = useContext(MasterAudioContext)

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
      wavesurfer.onSolo = false
      wavesurfer.on('ready', () => {
        // Una vez que el audio se haya cargado, puedes acceder al buffer
        wavesurfer.backend.source = source
        const lowFilter = wavesurfer.backend.ac.createBiquadFilter();
        lowFilter.type = 'lowshelf';
        lowFilter.frequency.value = 500;
        lowFilter.gain.value = 1;
        
        // MEDIOS
        const midFilter = wavesurfer.backend.ac.createBiquadFilter();
        midFilter.type = 'peaking';
        midFilter.frequency.value = 1600;
        midFilter.gain.value = 1;
        
        // AGUDOS
        const highFilter = wavesurfer.backend.ac.createBiquadFilter();
        highFilter.type = 'highshelf';
        highFilter.frequency.value = 10000;
        highFilter.gain.value = 1;
       
        wavesurfer.backend.setFilter(lowFilter, midFilter, highFilter);      

        //wavesurfer.backend.ac.sampleRate = '44100'
        console.log('wavesurfer ready',wavesurfer)
        addTrackToList(wavesurfer)
        setWaveformComponent(wavesurfer)
        addArrayBuffers(wavesurfer.backend.buffer, soundID)
      });
      

      return () => {
        wavesurfer.destroy()
      };
    }, [containerRef,masterAudioCtx]);

    if(waveformComponent){
      //addTrackToList(waveformComponent)
    }
    return waveformComponent
  }

  export default useWaveform;