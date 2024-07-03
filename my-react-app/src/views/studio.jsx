import React, { useEffect, useState } from 'react';
import '../css/studio.css';
import ProjectEditor from '../components/Studio/ProjectEditor';
import { SettingsProvider } from '../contexts/SettingsContext'
import { MasterAudioContextProvider } from "../contexts/MasterAudioContext";
import { getProject } from '../services/projects/getProject';
import { getUserFavs } from '../services/users/getUserFavs';
import { useModal } from "../hooks/useModal"
import Modal from "../components/Modals/Modal"
import GenericMsg from "../components/Modals/GenericMsg";
import useSettings from '../hooks/useSettings';

const Studio = () => {
      //TODO: Obtener información de la BD con el ID del proyecto
      const [projectDataContext, setProjectDataContext] = useState(null); // El estado del contexto
      const [avaibleFavs, setAvaibleFavs] = useState(null)
      const [loading, setLoading] = useState(null)
      const [isOpenModalSampleSelector, openModalSampleSelector, closeModalSampleSelector] = useModal(false)
      const [modalMsg, setModalMsg] = useState(null)
      const projectId = '6670f16ce0514db5f7b74e1e'
      const userId = '665b28e287fa373281f47938'

      const initialSettings = {
        projectName: null,
        projectDataContext: null
      }

      useEffect(()=>{
        console.log('[studio.jsx].[useEffect]')
        console.log('[studio.jsx].[useEffect].projectDataContext=',projectDataContext)
        //if(projectDataContext !== null || loading === true) return
        setLoading(true)
        setInitValues(projectId, userId)
      }, [])
      
      const setInitValues = async (projectId, userId) => {
        console.log('setInitValues.loading', loading)
        if(loading) return
        var resultProject = await getProject(projectId)
        if(resultProject.status != 200){
          console.log('[studio.jsx].[useEffect].setInitValues.resultProject=', resultProject)
          setLoading(false)
          setModalMsg(resultProject.data.errorCode)
          openModalSampleSelector()
          return
        }else{
          console.log('[studio.jsx].[useEffect].setInitValues.resultProject=', resultProject)
          setProjectDataContext(resultProject)
          initialSettings.projectDataContext = resultProject
          initialSettings.projectName = resultProject.projectName
        }
        console.log('[studio.jsx].[useEffect].setInitValues.#####MEDIO#######.loading=', loading)
        console.log('[studio.jsx].[useEffect].setInitValues.#####MEDIO#######.ProjectDataContext=', projectDataContext)
        getUserFavs(userId).then(favs =>{
          console.log('[studio.jsx].[useEffect].setInitValues.favs=', favs)
          setFavouritesSamples(favs)
          setAvaibleFavs(getFavsAvailable(favs))
        })
        console.log('[studio.jsx].[useEffect].setInitValues.#####FIN#######.avaibleFavs=', avaibleFavs)
        setLoading(false)
      }

      const getFavsAvailable = (allFavs) => {
        var listFilteredFavs = new Array;
        console.log('getFavsAvailable.allFavs',allFavs)
        if(!allFavs) return
        allFavs.map(fav => {
          if(channelList.find(value => value.id === fav.id) === undefined) listFilteredFavs.push(fav)
          })
          return listFilteredFavs
      }    
      
      if(loading) return <h1 style={{color: '#fff'}}>LOADING</h1>

      if(projectDataContext === null){ 
        return( 
          <Modal isOpen={isOpenModalSampleSelector} closeModal={closeModalSampleSelector}>
            <GenericMsg 
              type="ERROR" 
              msg={modalMsg}
              handleCloseSamplesSelector={closeModalSampleSelector} 
              //handleOnClickSelection 
            />
          </Modal>
          )}else{
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
}

export default Studio;