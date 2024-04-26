import React, { useEffect, useState } from 'react';
import '../App.css';
import './studio';
import ProjectEditor from '../components/ProjectEditor';
import { SettingsProvider } from '../contexts/SettingsContext'
import { MasterAudioContextProvider } from "../contexts/MasterAudioContext";

const Studio = () => {
      //TODO: Obtener información de la BD con el ID del proyecto
      const [dataContext, setDataContext] = useState(null); // El estado del contexto
      
      useEffect(()=>{
        fetch("http://localhost:3001/api/project/213")
        .then(response => response.json())
        .then(json => {
          console.log(json)
          setDataContext(json)
        })
      },[])
      
      const initialSettings = {
        projectName: 'firstProject',
        dataContext: dataContext
        }

      if(dataContext === null) return <h1>LOADING</h1>

    return(
        <>
          <div className='container'>
            <SettingsProvider settings={initialSettings}>
              <MasterAudioContextProvider value={{}}>
                <ProjectEditor dataContext={dataContext} />
              </MasterAudioContextProvider>
            </SettingsProvider>
          </div>
        </>
    )
}

export default Studio;