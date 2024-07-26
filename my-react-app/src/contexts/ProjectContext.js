import React, { useState, useContext, useEffect } from "react";
import { getProjectServ } from '../services/projects/getProjectServ';
import { saveProjectServ } from '../services/projects/saveProjectServ';
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
        console.log('[ProjectContextProvider].[useEffect].soundList', soundList)
        console.log('[ProjectContextProvider].[useEffect].projectInfoEntry', projectInfoEntry)
        setInitValues(projectInfoEntry)
    }, [])

    const getSoundList = () => {
        return soundList
    }

    const getProjectInfo = () => {
        return projectInfo
    }

    const saveProject = () => {
        var channelListReq = new Array;
        soundList.map(sound => {
            var channelItem = {
                sampleId: sound.id,
                channelConfig: sound.channelConfig
            }
            channelListReq.push(channelItem)
        })
        const req = {
            "projectId": projectInfo.id,
            "userId": projectInfo.userId,
            "projectName": projectInfo.projectName,
            "totalDuration": 0,
            "channelList": channelListReq
        }
        console.log('[ProjectContext.js].req=', req)
        const saveProjectResult = saveProjectServ(req)
        console.log('[ProjectContext.js].saveProjectResult=', saveProjectResult)
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
                totalDuration: 1            
            }
            setProjectInfo(projectInfoResp)
            setSoundList([])
            console.log('[ProjectContextProvider].[setInitValues].end')
        }else{
            const projectData = await getProjectServ(projectInfoEntryParam.id)
            if(projectData === undefined) return
            console.log('projectDatita', projectData)
            var projectInfoResp = {
                id: projectData.id,
                userId: projectData.userId,
                projectName: projectData.projectName,
                createdDate: projectData.createdDate,
                savedDate: projectData.savedDate,
                totalDuration: projectData.totalDuration
            }
            setProjectInfo(projectInfoResp)
            setSoundList(projectData.channelList)
            console.log('[ProjectContext.js].setInitValues.#####MEDIO#######.loading=', loading)
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
                    deleteChannel,
                    saveProject
                    }}>
                        {children}
                </ProjectContext.Provider>
            </>
}

export default ProjectContext;