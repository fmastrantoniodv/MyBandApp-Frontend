import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import CreateWaveform from "../components/CreateAudioWaveform/CreateWaveform";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import ListOfChannels from "./ListOfChannels"
import CurrentTime from "./CurrentTime";

export default function ProjectEditor ({ dataContext }) {
    const sounds = dataContext.soundsList;
    const sampleList = [];
    const [playing, setPlaying] = useState(false)

    const audioCtxMaster = new AudioContext();

    useEffect(() => {
      console.log('[ProjectEditor].[useEffect]')
      console.log(sampleList)
    }, [sounds]);

    createSampleObjects()

    function createSampleObjects(){
      sounds.sounds.map(sound => {
        var containerRef = useRef()
        var waveform = new CreateWaveform(sound, sound.id, containerRef)
                
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
    
    const playProject = () => {
        console.log('Play')
        setPlaying(true)
        sampleList.map(sample => {
          return sample.waveform.play()
       })
     }

    const stopProject = () => {
        console.log('Stop')
        setPlaying(false)
        sampleList.map(sample => {
           return sample.waveform.stop()
        })
    }

    const pauseProject = () => {
        console.log('Pause')
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
