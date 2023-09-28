import React, { useState } from 'react';
import '../App.css';
import './studio';
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
          },
          {
            id: 'sample3',
            src: '../samples/sample3.wav'
          }
        ]
      })
      
      const [dataContext, setDataContext] = useState({
        projectName: 'firstProject',
        soundsList: sounds
        }); // El estado del contexto


    return(
        <>
          <div className='container'>
            <ProjectEditor dataContext={dataContext}/>
          </div>
        </>
    )
}

export default Studio;