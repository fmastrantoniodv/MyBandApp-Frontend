import React, { useState, useEffect } from 'react';
import '../App.css';
import './studio';
import ProjectEditor from '../components/ProjectEditor';
import { SettingsProvider } from '../contexts/SettingsContext'
import useSettings from '../hooks/useSettings';

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
        soundsList: sounds
        }); // El estado del contexto

      const initialSettings = {
        projectName: 'firstProject',
        soundsList: sounds
        }

        useEffect(() => {
          console.log('[Studio].[useEffect]')
        }, []);
    

    return(
        <>
          <div className='container'>
            <SettingsProvider settings={initialSettings}>
              <ProjectEditor dataContext={dataContext} />
            </SettingsProvider>
          </div>
        </>
    )
}

export default Studio;