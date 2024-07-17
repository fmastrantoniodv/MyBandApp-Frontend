import React, { useEffect, useState } from 'react';
import '../css/studio.css';
import ProjectEditor from '../components/Studio/ProjectEditor';
import { MasterAudioContextProvider } from "../contexts/MasterAudioContext";
import { ProjectContextProvider } from "../contexts/ProjectContext";
import ListOfChannels from "../components/Studio/ListOfChannels"

const Studio = ({projectInfo}) => {

      if(projectInfo === undefined) return

      useEffect(()=>{
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