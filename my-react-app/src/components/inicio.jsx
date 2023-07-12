import React from 'react';
import '../App.css';
import '../components/studio';
import AudioGroup from '../class/AudioClass/AudioGroup';
import ProjectContext from '../contexts/ProjectContext';
import ProjectEditor from './ProjectEditor';
import Waveform from './AudioWaveformRender/Waveform';
import CreateWaveform from './CreateAudioWaveform/CreateWaveform';

const Inicio = () => {
      const sounds = {
      sounds: [
        {
          id: 'kick',
          src: '../samples/kick.mp3'
        },
        {
          id: 'clap',
          src: '../samples/clap.mp3'
        },
        {
          id: 'shake',
          src: '../samples/shake.mp3'
        }
      ]
    }
    
                  
    return(
        <>
        <div className='container'>
          <ProjectContext.Provider value={{
            name: 'firstProject',
            soundsProject: sounds,
            wavesurferObj: []
            }
            }>

            {
/*
            <AudioGroup sounds={sounds}>
              
            </AudioGroup>
            */
          }
            <ProjectEditor></ProjectEditor>
          </ProjectContext.Provider>
        </div>
        
        </>
    )
}

export default Inicio;