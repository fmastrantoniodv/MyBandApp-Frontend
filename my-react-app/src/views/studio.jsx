import React, { useEffect, useState } from 'react';
import '../App.css';
import ProjectEditor from '../components/ProjectEditor';
import { SettingsProvider } from '../contexts/SettingsContext'
import { MasterAudioContextProvider } from "../contexts/MasterAudioContext";
import useProject from '../hooks/useProject'


const Studio = () => {
      //TODO: Obtener información de la BD con el ID del proyecto
      const [dataContext, setDataContext] = useState(null); // El estado del contexto
      const projectData = useProject(213)
      
      useEffect(()=>{
        setDataContext(projectData)
      },[projectData])
      
      console.log('dataContext=', dataContext)
      if(dataContext === null) return <h1 style={{color: '#fff'}}>LOADING</h1>
      
      const initialSettings = {
        projectName: dataContext.projectInfo.projectName,
        dataContext: dataContext
      }

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