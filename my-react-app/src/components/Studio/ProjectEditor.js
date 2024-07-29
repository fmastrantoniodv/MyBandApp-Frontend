import React, { useEffect, useState, useContext } from "react";
import 'react-range-slider-input/dist/style.css';
import CurrentTime from "./CurrentTime";
import playIcon from '../../img/playIcon.svg'
import stopIcon from '../../img/stopIcon.svg'
import pauseIcon from '../../img/pauseIcon.svg'
import exportIcon from '../../img/exportIcon.svg'
import saveIcon from '../../img/saveIcon.svg'
import MasterAudioContext from '../../contexts/MasterAudioContext'
import ProjectContext from '../../contexts/ProjectContext'

export default function ProjectEditor ({}) {
    const [playing, setPlaying] = useState('false')
    const { exportWavFile, playBackTracks } = useContext(MasterAudioContext)
    const { loading, getProjectInfo, getSoundList, saveProject } = useContext(ProjectContext)
    
    useEffect(() => {
      console.log('[ProjectEditor].[useEffect].loading', loading)
    }, [loading]);
      
    const playProject = () => {
      var soundList = getSoundList()
      if(soundList === undefined || soundList < 1) return
      console.log('Play',getSoundList().lenght)

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
        playBackTracks('pause')
        setPlaying('pause') 
    }
  
    const PlayButton = () => {
      return(
        <button className="btn-project-controls" onClick={() => playProject()}>
          <img src={playIcon} alt="icono de reproducir" width="100%" />  
        </button>
      )
    }

    const StopButton = () => {
      return(
        <button className="btn-project-controls" onClick={() => stopProject()}>
          <img src={stopIcon} alt="icono de detener reproduccion" width="100%" />  
        </button>
      )
    }

    const PauseButton = () => {
      return(
        <button className="btn-project-controls" onClick={() => pauseProject()}>
          <img src={pauseIcon} alt="icono de pausar reproduccion" width="100%" />  
        </button>
      )
    }

    const ExportProject = () =>{
      return(
        <button className="btn-export" onClick={() => exportWavFile()}>
          <img src={exportIcon} alt="icono de exportar archivo" width="100%" />
        </button>
      )
    }

    const SaveProject = () =>{
      return(
        <button className="btn-save-project" onClick={() => saveProject()}>
          <img src={saveIcon} alt="icono de guardar proyecto" width="100%"/>
        </button>
      )
    }

    return (
        <>
            <div className='project-controls' >
              <div className='project-info'>
                <span>{getProjectInfo().projectName}</span>
                <div className='project-info-btns'>
                  <ExportProject />
                  <SaveProject />
                </div>
              </div>
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
