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
import { saveProjectServ } from '../../services/projectsServ'

export default function ProjectEditor ({}) {
    const [playing, setPlaying] = useState('false')
    const { exportWavFile, playBackTracks, getTracklist, setProjectBPM, projectBPM, getPlayBackCurrentTime } = useContext(MasterAudioContext)
    const { loading, getProjectInfo, getSoundList } = useContext(ProjectContext)
    const [inputBPMSavedValue, setInputBPMSavedValue] = useState()
    const [inputBPMValue, setInputBPMValue] = useState(projectBPM)
    
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
    
    const ProjectBPM = () =>{
      const focusInput = () =>{
        document.getElementById('input-bpm').focus()
      }
      return(
        <div className="bpm-container">
          <input id='input-bpm' min={1} max={999} maxLength={3} value={inputBPMValue} 
            onChange={(e)=>{setInputBPMValue(e.target.value)}}
            onFocus={(e)=>{setInputBPMSavedValue(e.target.value)}}
            onBlur={(e)=>{
              if(e.target.value < 1 || e.target.value === ''){
                setInputBPMValue(inputBPMSavedValue)
                setProjectBPM(inputBPMSavedValue)
              }else{
                setProjectBPM(e.target.value)
              }
            }}
            onKeyDown={(e)=>{
              if(e.key === "Enter"){
                e.target.blur()
              }
            }}
            />
          <span onClick={()=>{focusInput()}}>BPM</span>
        </div>
      )
    }

    const PlayButton = () => {
      return(
        <button className="btn-project-controls" onClick={() => playProject()}>
          <img src={playIcon} alt="icono de reproducir" width="100%" />  
        </button>
      )
    }

    const StopButton = () => {
      console.log('getPlayBackCurrentTime', getPlayBackCurrentTime())
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

    const saveProjectFunc = () => {
      let trackList = getTracklist()
      let projectInfo = getProjectInfo()
      console.log('[ProjectEditor.js].saveProjectFunc.trackList', trackList)
      var channelListReq = new Array;
      trackList.map(track => {
          var channelItem = {
              sampleId: track.id,
              channelConfig: track.channelConfig
          }
          channelListReq.push(channelItem)
      })
      const req = {
          "projectId": projectInfo.id,
          "userId": projectInfo.userId,
          "projectName": projectInfo.projectName,
          "totalDuration": 0,
          "channelList": channelListReq
      }
      console.log('[ProjectContext.js].req=', req)
      const saveProjectResult = saveProjectServ(req)
      console.log('[ProjectContext.js].saveProjectResult=', saveProjectResult)
  }
    const SaveProject = () =>{
      return(
        <button className="btn-save-project" onClick={() => saveProjectFunc()}>
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
              <ProjectBPM />
            </div>
        </>
        )
}
