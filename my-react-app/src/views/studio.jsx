import React, { useEffect, useState } from 'react';
import '../css/studio.css';
import ProjectEditor from '../components/Studio/ProjectEditor';
import { SettingsProvider } from '../contexts/SettingsContext'
import { MasterAudioContextProvider } from "../contexts/MasterAudioContext";
import { useModal } from "../hooks/useModal"
import ListOfChannels from "../components/Studio/ListOfChannels"
import Modal from "../components/Modals/Modal"
import GenericMsg from "../components/Modals/GenericMsg";
import useSettings from '../hooks/useSettings';
import SampleSelector from "../components/Modals/SampleSelector"
import { getProject } from '../services/projects/getProject';
import { useSampleList } from '../hooks/useSampleList';

const Studio = () => {
      //TODO: Obtener información de la BD con el ID del proyecto
      const [projectDataContext, setProjectDataContext] = useState(null); // El estado del contexto
      const [loading, setLoading] = useState(null)
      const [isOpenModalSampleSelector, openModalSampleSelector, closeModalSampleSelector] = useModal(false)
      const [isOpenGenericModal, openGenericModal, closeGenericModal] = useModal(false)
      const [modalMsg, setModalMsg] = useState(null)
      const [soundsList, setSoundsList] = useState(null)
      const [initProjectChannelList, addChannelToList, deleteChannelFromList, getSampleList] = useSampleList()
      const projectId = '6670f16ce0514db5f7b74e1e';

      const initialSettings = {
        projectName: null,
        projectDataContext: null
      }

      useEffect(()=>{
        console.log('[studio.jsx].[useEffect].projectDataContext=',projectDataContext)
        if(projectDataContext !== null || loading === true) return
        setLoading(true)
        setInitValues(projectId)
      }, [])
      
      const setInitValues = async (projectId) => {
        console.log('setInitValues.loading', loading)
        if(loading) return
        const projectData = await getProject(projectId)
        console.log('projectDatita', projectData)
        setProjectDataContext(projectData)
        initProjectChannelList(projectData.channelList)
        setSoundsList(projectData.channelList)
        console.log('[studio.jsx].[useEffect].setInitValues.#####MEDIO#######.loading=', loading)
        console.log('[studio.jsx].[useEffect].setInitValues.#####MEDIO#######.ProjectDataContext=', projectDataContext)
        setLoading(false)
      }

      const handleOnClickSelection = (item) => {
        console.log('[studio.jsx].[handleOnClickSelection].item',item)
        addChannelToList(item)
        console.log('[studio.jsx].[getSampleList].result',getSampleList())
        setSoundsList(getSampleList())
        closeModalSampleSelector()
      }

      if(loading) return <h1 style={{color: '#fff'}}>LOADING</h1>

      if(projectDataContext === null ){ 
        return( 
          <Modal isOpen={isOpenGenericModal} closeModal={closeGenericModal}>
            <GenericMsg 
              type="ERROR" 
              msg={modalMsg}
              handleCloseModal={closeGenericModal}
              buttonsConfig={{
                positiveTextBtn: "Reintentar",
                negativeTextBtn: "Cerrar",
                positiveAction: setInitValues,
                negativeAction: closeGenericModal
              }
              } 
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
                      handleDeleteChannel={deleteChannelFromList}
                      />
                  </MasterAudioContextProvider>
                </SettingsProvider>
              </div>
            </>
        )
      }
}

export default Studio;