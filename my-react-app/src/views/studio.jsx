import React, { useEffect, useState } from 'react';
import '../App.css';
import './studio';
import ProjectContext from '../contexts/ProjectContext';
import ProjectEditor from '../components/ProjectEditor';


const Studio = () => {
      //TODO: Obtener información de la BD con el ID del proyecto
      const [sounds, setSounds] = useState({
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
      })
      const [dataContext, setDataContext] = useState({
        projectName: 'firstProject',
        //sampleList: sampleList,
        //audioContext: audioContext,
        soundsList: sounds
        }); // El estado del contexto

      const updateContext = newData => {
        setDataContext(prevData => ({ ...prevData, ...newData }));
        console.log('Context update')
        console.log(newData)
      };
      
    return(
        <>
        <div className='container'>
          <ProjectContext.Provider value={{ dataContext, updateContext }}>
            <ProjectEditor />
          </ProjectContext.Provider>
        </div>
        
        </>
    )
}

export default Studio;