import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

const CreateWaveform = (sound, soundName) => {

    const [waveformComponent, setWaveformComponent] = useState(null)
    const [audioCargado, setAudioCargado] = useState(false);

    useEffect(() => {
      const audio = new Audio()
      audio.controls = true
      audio.src = sound.src
      const handleAudioCargado = () => {
        // Cuando el audio se carga por completo, actualiza el estado
        setAudioCargado(true);
        // Realiza cualquier acción adicional que desees aquí
        console.log('El audio se ha cargado completamente.');
      };
      
      audio.addEventListener('loadeddata', handleAudioCargado);

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

      // Define the equalizer bands
      const eqBands = [100, 1600, 14000]
  
      // Create a biquad filter for each band
      const filters = eqBands.map((band) => {
        const filter = audioContext.createBiquadFilter()
        filter.type = 'peaking'
        filter.gain.value = Math.random() * 40 - 20
        filter.Q.value = 1 // resonance
        filter.frequency.value = band // the cut-off frequency
        return filter
      })
      
      // Create a MediaElementSourceNode from the audio element
      const mediaNode = audioContext.createMediaElementSource(audio)

      // Connect the filters and media node sequentially
      const equalizer = filters.reduce((prev, curr) => {
        prev.connect(curr)
        return curr
      }, mediaNode)
            
      // Connect the filters to the audio output
      equalizer.connect(audioContext.destination)
      setWaveformComponent(wavesurfer)
      return () => {
        audio.removeEventListener('loadeddata', handleAudioCargado);
        wavesurfer.destroy()
      };
    }, []);
    
    return waveformComponent;
  }

  export default CreateWaveform;