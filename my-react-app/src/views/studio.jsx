import React, { useEffect, useState } from 'react';
import '../css/studio.css';
import ProjectEditor from '../components/Studio/ProjectEditor';
import { SettingsProvider } from '../contexts/SettingsContext'
import { MasterAudioContextProvider } from "../contexts/MasterAudioContext";
import { getProject } from '../services/projects/getProject';
import { useModal } from "../hooks/useModal"
import ListOfChannels from "../components/Studio/ListOfChannels"
import Modal from "../components/Modals/Modal"
import GenericMsg from "../components/Modals/GenericMsg";
import useSettings from '../hooks/useSettings';
import SampleSelector from "../components/Modals/SampleSelector"

const Studio = () => {
      //TODO: Obtener información de la BD con el ID del proyecto
      const [projectDataContext, setProjectDataContext] = useState(null); // El estado del contexto
      const [loading, setLoading] = useState(null)
      const [isOpenModalSampleSelector, openModalSampleSelector, closeModalSampleSelector] = useModal(false)
      const [isOpenGenericModal, openGenericModal, closeGenericModal] = useModal(false)
      const [callbackAddChannel, setCallbackAddChannel] = useState(null)
      const [modalMsg, setModalMsg] = useState(null)
      const [soundsList, setSoundsList] = useState(null)
      const projectId = '6670f16ce0514db5f7b74e1e';

      const initialSettings = {
        projectName: null,
        projectDataContext: null
      }

      useEffect(()=>{
        console.log('[studio.jsx].[useEffect]')
        console.log('[studio.jsx].[useEffect].projectDataContext=',projectDataContext)
        console.log('[studio.jsx].[useEffect].callbackAddChannel=',callbackAddChannel)
        //if(projectDataContext !== null || loading === true) return
        setLoading(true)
        setInitValues(projectId)
      }, [])
      
      const setInitValues = async (projectId) => {
        console.log('setInitValues.loading', loading)
        if(loading) return
        var resultProject = await getProject(projectId)
        if(resultProject.status != 200){
          console.log('[studio.jsx].[useEffect].setInitValues.resultProject=', resultProject)
          setLoading(false)
          setModalMsg(resultProject.data.errorCode)
          openGenericModal()
          return
        }else{
          console.log('[studio.jsx].[useEffect].setInitValues.resultProject=', resultProject)
          setProjectDataContext(resultProject.data)
          setSoundsList(resultProject.data.channelList)          
          initialSettings.projectName = resultProject.data.projectName
        }
        console.log('[studio.jsx].[useEffect].setInitValues.#####MEDIO#######.loading=', loading)
        console.log('[studio.jsx].[useEffect].setInitValues.#####MEDIO#######.ProjectDataContext=', projectDataContext)
        setLoading(false)
      }

      const handleOnClickSelection = () => {
        console.log('[studio.jsx].[handleOnClickSelection].callbackAddChannel',callbackAddChannel)
        return callbackAddChannel()
      }

      
      if(loading) return <h1 style={{color: '#fff'}}>LOADING</h1>

      if(projectDataContext === null){ 
        return( 
          <Modal isOpen={isOpenGenericModal} closeModal={closeGenericModal}>
            <GenericMsg 
              type="ERROR" 
              msg={modalMsg}
              handleCloseSamplesSelector={closeGenericModal} 
              //handleOnClickSelection 
            />
          </Modal>
          )}else{
            return(
            <>        
              <Modal isOpen={isOpenModalSampleSelector} closeModal={closeModalSampleSelector}>
                <SampleSelector 
                  channelList={soundsList} 
                  handleCloseSamplesSelector={closeModalSampleSelector}
                  handleOnClickSelection={handleOnClickSelection}
                />
              </Modal>
              <div className='studio-container'>
                <SettingsProvider settings={initialSettings}>
                  <MasterAudioContextProvider value={{}}>    
                    <ProjectEditor projectDataContext={projectDataContext} />
                    <ListOfChannels 
                      sampleList={soundsList} 
                      openModalSampleSelector={openModalSampleSelector} 
                      closeModalSampleSelector={closeModalSampleSelector}
                      setCallbackAddChannel={setCallbackAddChannel}/>
                  </MasterAudioContextProvider>
                </SettingsProvider>
              </div>
            </>
        )
      }
}

export default Studio;