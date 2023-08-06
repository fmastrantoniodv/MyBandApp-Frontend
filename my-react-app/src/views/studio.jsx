import React from 'react';
import '../App.css';
import './studio';
import ProjectContext from '../contexts/ProjectContext';
import ProjectEditor from '../components/ProjectEditor';
import CreateWaveform from "../components/CreateAudioWaveform/CreateWaveform";

const Studio = () => {
      //TODO: Obtener información de la BD con el ID del proyecto
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
      
      const sampleList = [];

      sounds.sounds.map(sound => {
        var sampleObj = {
          name: sound.id,
          waveform: new CreateWaveform(sound, sound.id)
        }
        console.log(sampleObj.waveform)
        sampleList.push(sampleObj)
      })

    return(
        <>
        <div className='container'>
          <ProjectContext.Provider value={{
            name: 'firstProject',
            sampleList: sampleList
            }
            }>
            <ProjectEditor/>
          </ProjectContext.Provider>
        </div>
        
        </>
    )
}

export default Studio;