<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
=======
import React, { useState, useEffect } from 'react';
>>>>>>> 9bd12fc0958d34465089562165576660596b3842
import '../App.css';
import './studio';
import ProjectEditor from '../components/ProjectEditor';
import { SettingsProvider } from '../contexts/SettingsContext'
import useSettings from '../hooks/useSettings';

const Studio = () => {
      //TODO: Obtener información de la BD con el ID del proyecto
<<<<<<< HEAD
      const [dataContext, setDataContext] = useState(null); // El estado del contexto

      useEffect(()=>{
        fetch("https://run.mocky.io/v3/387096b4-6ecf-40a1-a9d1-b111b4234455")
        .then(response => response.json())
        .then(json => {
          setDataContext(json)
        })
      },[])

      if(dataContext === null) return <h1>LOADING</h1>
=======
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
    
>>>>>>> 9bd12fc0958d34465089562165576660596b3842

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