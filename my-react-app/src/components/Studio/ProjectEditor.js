import React, { useEffect, useState, useContext } from "react";
import 'react-range-slider-input/dist/style.css';
import CurrentTime from "./CurrentTime";
import playIcon from '../../img/playIcon.svg'
import stopIcon from '../../img/stopIcon.svg'
import pauseIcon from '../../img/pauseIcon.svg'
import exportIcon from '../../img/exportIcon.svg'
import MasterAudioContext from '../../contexts/MasterAudioContext'

export default function ProjectEditor ({ projectDataContext }) {
    const sounds = projectDataContext.channelList;
    const sampleList = [];
    const [playing, setPlaying] = useState('false')
    const [soundsList, setSoundsList] = useState(null)
    const { exportWavFile, playBackTracks } = useContext(MasterAudioContext)
    
    useEffect(() => {
      console.log('[ProjectEditor].[useEffect].projectDataContext', projectDataContext)
      setSoundsList(sounds)
    }, [sounds]);
      
    const playProject = () => {
      console.log('Play')
      setPlaying('true')
      if(playing !== 'true'){
        playBackTracks('play')
      }
     }

    const stopProject = () => {
      setPlaying('false')
      playBackTracks('stop')
    }

    const pauseProject = () => {
        console.log('Pause')
        playBackTracks('pause')
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
      onClick={() => exportWavFile()}
      >
      <img 
        src={exportIcon} 
        alt="icono de exportar archivo"
        width="100%"
      ></img>  
    </button>
      )
    }

    return (
        <>
            <div className='project-controls' >
              <h1>{projectDataContext.projectName}</h1>
              <ExportProject />
              <div className="project-controls-btn-container">
                <PlayButton />
                <PauseButton />
                <StopButton />
              </div>
              <CurrentTime playing={playing} />        
            </div>
        </>
        )
}