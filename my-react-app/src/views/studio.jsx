import React, { useEffect, useState } from 'react';
import '../css/studio.css';
import ProjectEditor from '../components/Studio/ProjectEditor';
import { MasterAudioContextProvider } from "../contexts/MasterAudioContext";
import { ProjectContextProvider } from "../contexts/ProjectContext";
import ListOfChannels from "../components/Studio/ListOfChannels"

const Studio = () => {
      const projectId = '6670f16ce0514db5f7b74e1e';

      useEffect(()=>{
      }, [])

      return( 
          <>
            <ProjectContextProvider value={{projectId}}>
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