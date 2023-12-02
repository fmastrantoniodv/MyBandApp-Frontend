import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import ListOfChannels from "./ListOfChannels"
import CurrentTime from "./CurrentTime";
import deleteIconSvg from '../img/deleteIcon.svg'
import playIcon from '../img/playIcon.svg'
import stopIcon from '../img/stopIcon.svg'
import pauseIcon from '../img/pauseIcon.svg'

export default function ProjectEditor ({ dataContext }) {
    const sounds = dataContext.soundsList;
    const sampleList = [];

    const [loading, setLoading] = useState(true)
    const [playing, setPlaying] = useState('false')
    const [maxSampleLength, setMaxSampleLength] = useState()
    const [soundsList, setSoundsList] = useState(null)

    const audioCtxMaster = new AudioContext();

    useEffect(() => {
      console.log('[ProjectEditor].[useEffect]')
      setSoundsList(sounds)
    }, [sounds]);
    
    
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

    return (
        <>

          <div className='project-controls' >
            <h1>{dataContext.projectName}</h1>
            <div className="project-controls-btn-container">
              <PlayButton />
              <PauseButton />
              <StopButton />
            </div>
            <CurrentTime playing={playing} audioCtxMaster={audioCtxMaster}></CurrentTime>
            {/**
             * 
             * <div style={{ width: '100px', marginBottom: '10px' }}>
                <div style={{ paddingBottom: '10px' }}>
                  <span>Zoom</span>
                  <div style={{ marginTop: '10px' }}>
                    <RangeSlider
                      className="single-thumb"
                      defaultValue={[0, 1600]}
                      thumbsDisabled={[true, false]}
                      rangeSlideDisabled={false}
                      onInput={changeZoom}
                      max={1600}
                      />
                  </div>
                </div>
            </div>
             */}
            
          </div>
          <ListOfChannels sampleList={soundsList} playState={playing}/>
        </>
        )
}
