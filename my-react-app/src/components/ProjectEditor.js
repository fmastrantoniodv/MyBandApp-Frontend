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
    }, [sounds]);

    createSampleObjects()

    function createSampleObjects(){
      sounds.sounds.map(sound => {
        var spritesList = []

        sound.sprites.map(sprite => {
          var containerRef = useRef()
          var waveform = new CreateWaveform(sound, sound.id, containerRef, sprite)
          waveform.containerRefSprite = containerRef
          spritesList.push(waveform)
        })
        
        var sampleObj = {
          name: sound.id,
          waveform: spritesList[0],
          soundStates: {
            solo: false,
            muted: false,
            rec: false
          },
          containerRef: spritesList[0].containerRefSprite,
          spritesList: spritesList
        }
        sampleList.push(sampleObj)
      })    
    }
    /*
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
    */
    const playProject = () => {
         console.log('Play')
         /*
         let duration = sampleList[0].spritesList[0].source.mediaElement.duration * 1000
         console.log(duration)
         for (let index = 0; index < sampleList[0].spritesList.length; index++) {
           //setInterval(() => playIndex(index), duration)
           console.log(index)
           setTimeout(() => {playIndex(index)}, duration)
         }
         */
         sampleList.map(sample => {
          return sample.spritesList[0].play()
        })
        //playIndex()
        
     }

     const playIndex = () => {
      console.log('playindex')

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
