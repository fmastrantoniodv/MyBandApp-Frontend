import React, { useEffect, useState, useContext } from "react";
import AudioTrack from "./AudioTrack";
import SampleSelector from "./Modals/SampleSelector";
import { useModal } from "../hooks/useModal";
import Modal from "./Modals/Modal"

const ListOfChannels = ({ sampleList }) => {
    const [channelsStates, setChannelsStates] = useState([])
    const [loading, setLoading] = useState(true)
    const [channelList, setChannelList] = useState(null)
    const [isOpenModalSampleSelector, openModalSampleSelector, closeModalSampleSelector] = useModal(false)
    
    useEffect(() => {
      console.log("[ListOfChannels].[useEffect].channelList", channelList)
      if(sampleList !== null && channelList === null){
        setChannelList(sampleList)
        initChannelsStates(sampleList)
        setLoading(false)
      }
    }, [sampleList, channelList]);

    const handleChannelStatesOnMute = (sampleID) => {
      console.log("Mute: id="+sampleID)
      console.log("channelsStates",channelsStates)
      let newStates = {}
      if(channelsStates.find(value => value.id === sampleID).states.muted === false){    
        newStates = {muted: true, solo: false}
      }else{
        newStates = {muted: false, solo: false}
      }
      changeChannelStates(sampleID,newStates)
    }

    const handleChannelStatesOnSolo = (sampleID) => {
      console.log('[HandleSolo]', sampleID)
      let selectedSampleStates = channelsStates.find(value => value.id === sampleID) 
      console.log('[HandleSolo].[selectedSampleStates]=', selectedSampleStates)
      if(selectedSampleStates.states.solo === true){
        restartStates()
      }else{
        let updatedStates = []
        channelsStates.map(sampleStates => {
          if(sampleStates.id === sampleID){
            updatedStates.push({ id: sampleStates.id, states: {solo: true, muted: false} })
          }else{
            updatedStates.push({ id: sampleStates.id, states: {solo: false, muted: true} })
          }
        })
        setChannelsStates(updatedStates)  
      }
      console.log('Solo '+sampleID)
    }

    const restartStates = () => {
        let updatedStates = []
        channelsStates.map(sampleStates => {
            updatedStates.push({ id: sampleStates.id, states: {solo: false, muted: false} })
        })
        setChannelsStates(updatedStates)  
    }

    const changeChannelStates = (idSample , newStates) => {
        console.log('[changeChannelStates]', idSample, newStates)
        let updatedStates = []
        channelsStates.map(sampleStates => {
          let newRowToContext;
            if(idSample === sampleStates.id){
              newRowToContext = { id: sampleStates.id, states: newStates }
            }else{
              newRowToContext = { id: sampleStates.id, states: sampleStates.states }
            }
            updatedStates.push(newRowToContext)
        })
        setChannelsStates(updatedStates)
    }

    const initChannelsStates = (sampleList) => {
      let newStatesArray = []
      sampleList.map(sample => {
        let itemJson = {
          id: sample.id,
          states: sample.channelConfig.states
        }
        newStatesArray.push(itemJson)
      })
      setChannelsStates(newStatesArray)
      console.log('newStatesArray: ',newStatesArray)
    }

    const handleDeleteChannel = ( idChannel ) => {
      setChannelList(channelList.filter(value => value.id !== idChannel))
      setChannelsStates(channelsStates.filter(value => value.id !== idChannel))
    }

    const handleAddChannel = (item) => {
      console.log('Nueva pista')
      var updatedChannelList = channelList
      var newChannel = {
        id: item.id,
        sampleName: item.displayName,
        src: "http:fileserver.com/kick",
        duration: "6452",
        channelConfig: {
          states: {
              "solo": false,
              "muted": false
          },
          volume: 0.7,
          EQ: {
              low: 0.5,
              mid: 0.5,
              high: 0.5
          }
          
      }}
      console.log(newChannel)

      updatedChannelList.push(newChannel)
      
      let updatedChannelStates = channelsStates
      let newSampleStates = {
        id: newChannel.id,
        states: newChannel.channelConfig.states
      }
      updatedChannelStates.push(newSampleStates)
      
      setChannelList(updatedChannelList)
      setChannelsStates(updatedChannelStates)
      closeModalSampleSelector()
    }

    if(channelList === null || channelList === undefined) return

    return (
      <>
        <Modal isOpen={isOpenModalSampleSelector} closeModal={closeModalSampleSelector}>
          <SampleSelector 
            channelList={channelList} 
            handleCloseSamplesSelector={closeModalSampleSelector}
            handleOnClickSelection={handleAddChannel}
          />
        </Modal>
        <div className="tracks-container">
          {
            channelList.map(sample => {
                return <AudioTrack
                    key={sample.id} 
                    sample={sample}
                    handleChannelStatesOnMute={handleChannelStatesOnMute}
                    handleChannelStatesOnSolo={handleChannelStatesOnSolo}
                    states={channelsStates.find(value => value.id === sample.id).states}
                    handleDeleteChannel={handleDeleteChannel}
                    />
            })
          }
          </div>
          <div>
            <button 
              onClick={() => openModalSampleSelector()}
              style={{ 
                width: '70px',
                height: '50px',
                margin: '15px'
            }}>+</button>
            </div>
          </>
        )
}

export default ListOfChannels;