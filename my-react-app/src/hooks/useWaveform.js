import { useEffect, useState, useContext } from 'react';
import WaveSurfer from 'wavesurfer.js';
import MasterAudioContext from '../contexts/MasterAudioContext'

const useWaveform = (src, soundID, containerRef) => {
    const [waveformComponent, setWaveformComponent] = useState(null)
    const {masterAudioCtx, mainGainNode, addSampleComponentToList} = useContext(MasterAudioContext)
    
    useEffect(() => {
      console.log(`[useWaveform].[useEffect].[sample=${soundID}`)
      
      if (!containerRef.current) return 
      
      console.log(`[useWaveform].[useEffect].[containerRef`, containerRef)

      const audio = new Audio()
      audio.crossOrigin = "anonymous"
      audio.controls = true
      audio.src = src
      audio.autoplay = false
      audio.id = soundID
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
        backend: 'MediaElement',
        closeAudioContext: true    
      });

      const source = masterAudioCtx.createMediaElementSource(audio);
      
      const gain = masterAudioCtx.createGain();
      source.connect(gain)
      
      gain.connect(mainGainNode)

      //updateAudioCtxMerger(merger)
      wavesurfer.audioElement = audio;
      wavesurfer.audioCtx = masterAudioCtx;
      wavesurfer.source = source
      wavesurfer.gainNode = gain
      wavesurfer.load(audio);

      setWaveformComponent(wavesurfer)
      addSampleComponentToList(wavesurfer)
      return () => {
        wavesurfer.destroy()
      };
    }, [containerRef]);

    return waveformComponent;
  }

  export default useWaveform;