import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import CreateWaveform from "../components/CreateAudioWaveform/CreateWaveform";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import ListOfChannels from "./ListOfChannels"
import CurrentTime from "./CurrentTime";
import useSettings from "../hooks/useSettings";

export default function ProjectEditor ({ dataContext }) {
    const [playing, setPlaying] = useState('false')
    const [maxSampleLength, setMaxSampleLength] = useState(0)
    const [loading, setLoading] = useState()
    const { settings, saveSettings } = useSettings();
    const [soundsList, setSoundsList] = useState(dataContext.soundsList)
    
    const sampleList = [];
    
    const audioCtxMaster = new AudioContext();
    
    //const sounds = settings.soundsList;

    useEffect(() => {
      console.log('[ProjectEditor].[useEffect]')
      setLoading(true)
      setSoundsList(settings.soundsList)
      setMaxSampleLength(getProjectDuration(sampleList))
    }, [loading, settings]);

    if(!loading) createSampleObjects()

    function createSampleObjects(){
      soundsList.sounds.map(sound => {
        var containerRef = useRef()
        var waveform = new CreateWaveform(sound, sound.id, containerRef)
        if(waveform.backend !== undefined){
          waveform.backend.media.onended = () => {
            if(audioCtxMaster.currentTime * 1000 > maxSampleLength) stopProject()
          }
        }
        var sampleObj = {
          name: sound.id,
          waveform: waveform,
          soundStates: {
            solo: false,
            muted: false,
            rec: false
          },
          containerRef: containerRef,
        }

        sampleList.push(sampleObj)
      })    
    }
    
    const getProjectDuration = (sampleList) => {
      var maxDuration = 0;
      sampleList.map(sample => {
        if(sample.waveform.isReady){
          if(maxDuration < sample.waveform.getDuration()*1000){
            maxDuration = sample.waveform.getDuration()*1000;
          }
        }
      })
      setLoading(false)
      return maxDuration
    }
    
    const playProject = () => {
        console.log('Play')
        if(playing !== 'true'){
          setPlaying('true')
          sampleList.map(sample => {
            return sample.waveform.play()
         })
        }
     }

    const stopProject = () => {
        console.log('Stop')
        setPlaying('false')
        sampleList.map(sample => {
           return sample.waveform.stop()
        })
    }

    const pauseProject = () => {
        console.log('Pause')
        setPlaying('pause') 
        sampleList.map(sample => {
          console.log(sample.waveform.getCurrentTime())
           return sample.waveform.pause()
        })
    }
  
    const changeZoom = ( number ) => {
      sampleList.map(sample => {
        sample.waveform.zoom(number[1])
      })
    }

    return (
        <>
          <h1>{dataContext.projectName}</h1>

          <div className='projectControls' >
            <Button textButton='Play' onClickButton={() => playProject()}></Button>
            <Button textButton='Stop' onClickButton={() => stopProject()}></Button>
            <Button textButton='Pause' onClickButton={() => pauseProject()}></Button>
            <Button textButton='Prueba' onClickButton={() => handleToggleTheme()}></Button>
            <CurrentTime playing={playing} audioCtxMaster={audioCtxMaster}></CurrentTime>
            <div style={{ width: '100px', marginBottom: '10px' }}>
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
          </div>
          <ListOfChannels sampleList={sampleList}/>
        </>
        )
}
