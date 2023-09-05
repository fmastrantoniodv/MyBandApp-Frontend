import React, { useContext, useEffect, useState } from "react";
import ProjectContext from "../contexts/ProjectContext";
import Button from "./Button";
import AudioTrack from "./AudioTrack";
import CreateWaveform from "../components/CreateAudioWaveform/CreateWaveform";
import { AudioProvider } from "../contexts/AudioContextProvider";
import Timer from "./Timer";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

export default function ProjectEditor () {
    //Obtengo el projectContext
    const { dataContext, updateContext } = useContext(ProjectContext);
    const [currentTime, setCurrentTime] = useState(0)
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [sampleListLoad, setSampleListLoad] = useState(false)

    const sounds = dataContext.soundsList;
    const sampleList = [];
    
    function createSampleObjects(){
      sounds.sounds.map(sound => {
        var waveform = new CreateWaveform(sound, sound.id)
        var sampleObj = {
          name: sound.id,
          waveform: waveform,
          solo: false,
          onSolo: () => {
              sampleList.map(sample => {
                if(sampleObj.solo === false){
                  if(sample.name === sound.id){
                    sample.waveform.setMute(false)
                  }else{
                    sample.waveform.setMute(true)
                  }
                }else{
                  sample.waveform.setMute(false)
                }
              })
              sampleObj.solo == false ? sampleObj.solo = true : sampleObj.solo = false
              console.log('Solo '+sound.id+' = '+sampleObj.solo)
          },
          muted: false,
          onMute: () => {
            sampleObj.muted === false ? sampleObj.waveform.setMute(true) : sampleObj.waveform.setMute(false);
            sampleObj.muted == false ? sampleObj.muted = true : sampleObj.muted = false
            console.log('Mute '+sound.id+' = '+sampleObj.muted)
          }
        }
        sampleList.push(sampleObj)
      })   
      
    }
    
    createSampleObjects()
    useEffect(() => {
      /*
        updateContext({  
          sampleList: sampleList
        })
      */
      return () => {
      };
    }, []);


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
      
    const handlePlay = () => {
      if (!isRunning) {
        setIsRunning(true);
      }
    };
  
    const handleStop = () => {
      if (isRunning) {
        setIsRunning(false);
      }
    };
  
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
                <Timer isRunning={isRunning} elapsedTime={elapsedTime} />
                <div style={{
                  width: '100px',
                  marginBottom: '10px'
                  }}>
                    <div style={{
                      paddingBottom: '10px'
                    }}>
                    <span>Zoom</span>
                    <div style={{
                      marginTop: '10px'
                    }}>
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
            <AudioProvider>
            <div className="tracksContainer">
                {   
                    sampleList.map(sample => {
                        return <AudioTrack key={sample.name} sample={sample}/>
                        })
                }
            </div>
            </AudioProvider>
        </>
        )
}

