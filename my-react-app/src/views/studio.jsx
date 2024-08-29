import '../css/studio.css';
import React, { useEffect } from 'react';
import { MasterAudioContextProvider } from "../contexts/MasterAudioContext";
import { ProjectContextProvider } from "../contexts/ProjectContext";
import ProjectEditor from '../components/Studio/ProjectEditor';
import ListOfChannels from "../components/Studio/ListOfChannels"
import { useUser } from '../contexts/UserContext';

const Studio = () => {
  
      const { projectInfo } = useUser()
      if(projectInfo === undefined) return

      useEffect(()=>{
        console.log(`[studio.jsx].[useEffect]`)
      }, [])

      return( 
          <>
            <ProjectContextProvider projectInfoEntry={projectInfo}>
              <div className='studio-container'>
                  <MasterAudioContextProvider value={{}}>    
                    <ProjectEditor />
                    <ListOfChannels />
                  </MasterAudioContextProvider>
              </div>
            </ProjectContextProvider>
          </>
      )
}
export default Studio;