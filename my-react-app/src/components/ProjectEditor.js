import React, { useEffect, useRef } from "react";
import Button from "./Button";
import CreateWaveform from "../components/CreateAudioWaveform/CreateWaveform";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import ListOfChannels from "./ListOfChannels"

export default function ProjectEditor ({ dataContext }) {
    const sounds = dataContext.soundsList;
    const sampleList = [];

    useEffect(() => {
      console.log('[ProjectEditor].[useEffect]')
      console.log(sampleList)
    }, [sampleList]);

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
          containerRef: containerRef
        }
        sampleList.push(sampleObj)
      })    
    }

    const playProject = () => {
         console.log('Play')
         sampleList.map(sample => {
            return sample.waveform.play()
         })
     }
    
    const stopProject = () => {
        console.log('Stop')
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
