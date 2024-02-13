import React, { useEffect, useRef, useState, useContext } from "react";
import 'react-range-slider-input/dist/style.css';
import ListOfChannels from "./ListOfChannels"
import CurrentTime from "./CurrentTime";
import playIcon from '../img/playIcon.svg'
import stopIcon from '../img/stopIcon.svg'
import pauseIcon from '../img/pauseIcon.svg'
import exportIcon from '../img/exportIcon.svg'
import MasterAudioContext from "../contexts/MasterAudioContext";

export default function ProjectEditor ({ dataContext }) {
    const sounds = dataContext.soundsList;
    const sampleList = [];
    const [loading, setLoading] = useState(true)
    const [playing, setPlaying] = useState('false')
    const [maxSampleLength, setMaxSampleLength] = useState()
    const [soundsList, setSoundsList] = useState(null)
    const [audioCtxState, setAudioCtxState] = useState(null)
    
    const masterAudioContext = useContext(MasterAudioContext)
    
    useEffect(() => {
      console.log('[ProjectEditor].[useEffect]')
      console.log('[ProjectEditor].masterAudioContext', masterAudioContext)
      
      setAudioCtxState(masterAudioContext.masterAudioCtx)
      setSoundsList(sounds)
    }, [sounds, masterAudioContext.setAudioCtxState]);
    
    const exportProjectToMP3 = () => {
      console.log('[exportProjectToMP3].masterAudioContext', masterAudioContext )
      console.log('[exportProjectToMP3].audioCtxState', audioCtxState )
      
    }
    
    const playProject = () => {
        console.log('Play')
        if(playing !== 'true'){
          setPlaying('true')
        }
     }

    const stopProject = () => {
        console.log('Stop')
        setPlaying('false')
    }

    const pauseProject = () => {
        console.log('Pause')
        setPlaying('pause') 
    }
  
    const changeZoom = ( number ) => {
      sampleList.map(sample => {
        sample.waveform.zoom(number[1])
      })
    }

    const PlayButton = () => {
      return(
        <button className="btn-project-controls" 
          onClick={() => playProject()}
          >
          <img 
            src={playIcon} 
            alt="icono de reproducir"
            width="100%"
          ></img>  
        </button>        
      )
    }

    const StopButton = () => {
      return(
        <button className="btn-project-controls" 
          onClick={() => stopProject()}
          >
          <img 
            src={stopIcon} 
            alt="icono de detener reproduccion"
            width="100%"
          ></img>  
        </button>        
      )
    }

    const PauseButton = () => {
      return(
        <button className="btn-project-controls" 
          onClick={() => pauseProject()}
          >
          <img 
            src={pauseIcon} 
            alt="icono de pausar reproduccion"
            width="100%"
          ></img>  
        </button>        
      )
    }

    const ExportProject = () =>{
      return(
      <button className="btn-export"
      onClick={() => downloadMP3Project(dataContext.projectName)}
      >
      <img 
        src={exportIcon} 
        alt="icono de exportar archivo"
        width="100%"
      ></img>  
    </button>
      )
    }

    const downloadMP3Project = ( projectName ) => {
      console.log(projectName)
      console.log(audioCtxMaster)
      /*
      const destination = audioContext.createBuffer(
        1,
        audioContext.sampleRate * 10,
        audioContext.sampleRate
      );
  
      tracks.forEach((track, index) => {
        destination.getChannelData(0).set(track.getChannelData(0), index * track.length);
      });
  
      const audioBlob = new Blob([destination], { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(audioBlob);
  
      const downloadLink = document.createElement('a');
      downloadLink.href = audioUrl;
      downloadLink.download = 'combined_audio.wav';
      downloadLink.click();
      */
    }

    return (
        <>
            <div className='project-controls' >
              <h1>{dataContext.projectName}</h1>
              <ExportProject />
              <div className="project-controls-btn-container">
                <PlayButton />
                <PauseButton />
                <StopButton />
              </div>
              <CurrentTime playing={playing} audioCtxMaster={audioCtxState} />        
            </div>
            <ListOfChannels sampleList={soundsList} playState={playing} handleStop={stopProject}/>
        </>
        )
}
