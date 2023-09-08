import React, { useContext, useEffect, useState } from "react";
import Button from "./Button";
import AudioTrack from "./AudioTrack";
import CreateWaveform from "../components/CreateAudioWaveform/CreateWaveform";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

export default function ProjectEditor ({ dataContext }) {
    const sounds = dataContext.soundsList;
    const sampleList = [];
    const soundsStatesList = []
    

    useEffect(() => {
      console.log('[ProjectEditor].[useEffect]')
      console.log(sampleList)
    }, [sampleList]);

    createSampleObjects()

    function createSampleObjects(){
      sounds.sounds.map(sound => {
        var waveform = new CreateWaveform(sound, sound.id)

        var sampleObj = {
          name: sound.id,
          waveform: waveform,
          soundStates: {
            solo: false,
            muted: false,
            rec: false
          },
          onSolo: () => handleChannelStatesOnSolo(sampleObj),
          onMute: () => handleChannelStatesOnMute(sampleObj)
        }
        sampleList.push(sampleObj)
        soundsStatesList.push(sampleObj.soundStates)
      })   
      
    }

    const handleChannelStatesOnMute = (sampleObj) => {
        
        if(sampleObj.soundStates.muted === false){    
          sampleObj.waveform.setMute(true) 
          sampleObj.soundStates.muted = true
        }else{
          sampleObj.waveform.setMute(false)
          sampleObj.soundStates.muted = false
        }
        console.log('Mute '+sampleObj.name+' = '+sampleObj.soundStates.muted)
    }

    const handleChannelStatesOnSolo = (sampleParam) => {
      if(sampleParam.soundStates.solo === true){
        restartStates()
      }else{
        let resp = sampleList.findIndex(value => value.name === sampleParam.name)
        sampleList[resp].soundStates = {solo: true, muted: false, rec: false}
        sampleList[resp].waveform.setMute(false)
        sampleList.map(samplesOfList => {
          if(samplesOfList.name !== sampleParam.name){
            samplesOfList.soundStates = {solo: false, muted: true, rec: false}
            samplesOfList.waveform.setMute(true)
          }
        })
      }
      
      console.log('Solo '+sampleParam.name+' = '+sampleParam.soundStates.solo)
    }

    const restartStates = () => {
      sampleList.map(sample => {
        sample.waveform.setMute(false)
        sample.soundStates.solo = false
        sample.soundStates.muted = false
        sample.soundStates.rec = false
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
        
          <div className="tracksContainer">
              {
                sampleList.map(sample => {
                  return <AudioTrack key={sample.name} sample={sample}/>
                })
              }
          </div>
        </>
        )
}

