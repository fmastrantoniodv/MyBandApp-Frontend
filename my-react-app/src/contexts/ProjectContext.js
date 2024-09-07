import React, { useState, useContext, useEffect } from "react";
import { getProjectServ, saveProjectServ } from "../services/projectsServ";
import Modal from "../components/Modals/Modal"
import { useModal } from "../hooks/useModal"
import GenericMsg from "../components/Modals/GenericMsg"

const ProjectContext = React.createContext()

export function ProjectContextProvider({children, projectInfoEntry}){
    const [soundList, setSoundList] = useState(null)
    const [projectInfo, setProjectInfo] = useState(null) 
    const [loading, setLoading] = useState(null)
    const [isOpenGenericModal, openGenericModal, closeGenericModal] = useModal(false)
    const [modalMsg, setModalMsg] = useState(null)

    useEffect(()=>{
        console.log('[ProjectContextProvider].[useEffect].projectInfoEntry', projectInfoEntry)
        setInitValues(projectInfoEntry)
    }, [])

    const getSoundList = () => {
        console.log('[ProjectContextProvider].[getSoundList].soundList', soundList)
        return soundList
    }

    const getProjectInfo = () => {
        return projectInfo
    }

    const addChannelToList = (sampleInfo) => {
        console.log('Nueva pista', sampleInfo)
        var updatedChannelList = soundList
        var newChannel = {
          id: sampleInfo.id,
          sampleName: sampleInfo.sampleName,
          duration: sampleInfo.duration,
          collectionCode: sampleInfo.collectionCode,
          tempo: sampleInfo.tempo,
          channelConfig: {
            states: {
                "solo": false,
                "muted": false
            },
            volume: 0.7,
            EQ: {
                low: 0,
                mid: 0,
                high: 0
            }
        }}
        updatedChannelList.push(newChannel)
        setSoundList(updatedChannelList)
    }

    const deleteChannel = (channelId) => {
        setSoundList(soundList.filter(value => value.id !== channelId))      
    }

    const setInitValues = async (projectInfoEntryParam) => {
        console.log('[ProjectContextProvider].[setInitValues].loading', loading)
        console.log('[ProjectContextProvider].[setInitValues].projectInfoEntryParam', projectInfoEntryParam)
        if(loading) return
        setLoading(true)
        if(projectInfoEntryParam.projectId === null){
            console.log('[ProjectContextProvider].[setInitValues].project en blanco')
            var projectInfoResp = {
                userId: projectInfoEntryParam.userId,
                projectName: projectInfoEntryParam.projectName,
                createdDate: new Date(),
                totalDuration: 1,
                tempo: 100            
            }
            setProjectInfo(projectInfoResp)
            setSoundList([])
            console.log('[ProjectContextProvider].[setInitValues].end')
        }else{
            const projectData = await getProjectServ(projectInfoEntryParam.projectId)
            if(projectData === undefined) return
            console.log('projectDatita', projectData)
            var projectInfoResp = {
                id: projectData.id,
                userId: projectData.userId,
                projectName: projectData.projectName,
                createdDate: projectData.createdDate,
                savedDate: projectData.savedDate,
                totalDuration: projectData.totalDuration,
                tempo: projectData.tempo
            }
            setProjectInfo(projectInfoResp)
            setSoundList(projectData.channelList)
        }
        setLoading(false)
      }
      console.log('[ProjectContext.js].loading=', loading)
      if(loading === true || loading === null) return 'Loading..'
      
    return  <>
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
                <ProjectContext.Provider value={{
                    getSoundList,
                    setInitValues,
                    loading,
                    getProjectInfo,
                    addChannelToList,
                    deleteChannel
                    }}>
                        {children}
                </ProjectContext.Provider>
            </>
}

export default ProjectContext;