import React, { useEffect, useState } from 'react';
import '../css/studio.css';
import ProjectEditor from '../components/Studio/ProjectEditor';
import { SettingsProvider } from '../contexts/SettingsContext'
import { MasterAudioContextProvider } from "../contexts/MasterAudioContext";
import { getProject } from '../services/projects/getProject';

const Studio = () => {
      //TODO: Obtener información de la BD con el ID del proyecto
      const [projectDataContext, setProjectDataContext] = useState(null); // El estado del contexto
      const [loading, setLoading] = useState(null)
      const projectId = '6670f16ce0514db5f7b74e1e'

      useEffect(()=>{
        console.log('[studio.jsx].[useEffect]')
        console.log('[studio.jsx].[useEffect].projectDataContext=',projectDataContext)
        if(projectDataContext !== null || loading === true) return
        setLoading(true)
        getProject(projectId).then(project => {
          console.log('[studio.jsx].[useEffect].project=', project)
          setProjectDataContext(project)
          setLoading(false)
        })
      },[])
      
      if(loading || projectDataContext === null) return <h1 style={{color: '#fff'}}>LOADING</h1>
      
      const initialSettings = {
        projectName: projectDataContext.projectName,
        projectDataContext: projectDataContext
      }

      return(
          <>
            <div className='studio-container'>
              <SettingsProvider settings={initialSettings}>
                <MasterAudioContextProvider value={{}}>
                  <ProjectEditor projectDataContext={projectDataContext} />
                </MasterAudioContextProvider>
              </SettingsProvider>
            </div>
          </>
      )
}

export default Studio;